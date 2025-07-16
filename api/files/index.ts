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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
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
    res.status(500).json({ error: 'Internal server error' })
  }
}