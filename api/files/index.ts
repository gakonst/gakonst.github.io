import type { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

async function getAllMarkdownFiles(dir: string): Promise<string[]> {
  const files: string[] = []
  
  async function walk(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)
      if (entry.isDirectory()) {
        await walk(fullPath)
      } else if (entry.name.endsWith('.md')) {
        const relativePath = path.relative(contentDir, fullPath)
        files.push(relativePath)
      }
    }
  }
  
  await walk(dir)
  return files
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    // Log debugging info
    console.log('Current working directory:', process.cwd())
    console.log('Content directory path:', contentDir)
    
    // Check if content directory exists
    try {
      await fs.access(contentDir)
      const dirContents = await fs.readdir(process.cwd())
      console.log('Root directory contents:', dirContents)
    } catch (err) {
      console.error('Content directory not found:', contentDir)
      const dirContents = await fs.readdir(process.cwd())
      return res.status(500).json({ 
        error: 'Content directory not found',
        path: contentDir,
        cwd: process.cwd(),
        rootContents: dirContents
      })
    }
    
    const files = await getAllMarkdownFiles(contentDir)
    
    const contentFiles = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(contentDir, file)
        const fileContent = await fs.readFile(filePath, 'utf-8')
        const { data: frontmatter } = matter(fileContent)
        
        const route = file.replace(/\.md$/, '').replace(/\\/g, '/')
        
        return {
          route,
          slug: path.basename(file, '.md'),
          title: frontmatter.title || path.basename(file, '.md'),
          subtitle: frontmatter.subtitle,
          category: path.dirname(file) === '.' ? null : path.dirname(file),
          ...frontmatter
        }
      })
    )

    res.status(200).json({ files: contentFiles })
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
    })
  }
}