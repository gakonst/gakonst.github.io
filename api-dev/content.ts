import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import type { IncomingMessage, ServerResponse } from 'http'

const contentDir = path.join(process.cwd(), 'content')

async function processMarkdown(content: string) {
  // Process with unified, allowing raw HTML passthrough
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)
  return result.toString()
}

async function getAllMarkdownFiles(dir: string): Promise<string[]> {
  const files: string[] = []
  
  async function walk(currentDir: string) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name)
      if (entry.isDirectory()) {
        await walk(fullPath)
      } else if (entry.name.endsWith('.md')) {
        // Get relative path from content directory
        const relativePath = path.relative(contentDir, fullPath)
        files.push(relativePath)
      }
    }
  }
  
  await walk(dir)
  return files
}

export async function handleContentApi(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || '', `http://${req.headers.host}`)
  
  res.setHeader('Content-Type', 'application/json')
  
  try {
    // Handle listing all files
    if (url.pathname === '/api/files' || url.pathname === '/api/files/') {
      const files = await getAllMarkdownFiles(contentDir)
      
      const contentFiles = await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(contentDir, file)
          const fileContent = await fs.readFile(filePath, 'utf-8')
          const { data: frontmatter } = matter(fileContent)
          
          // Convert file path to route path
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

      res.writeHead(200)
      res.end(JSON.stringify({ files: contentFiles }))
      return
    }
    
    // Handle individual file requests - now supports paths like /api/files/writings/post1
    const fileMatch = url.pathname.match(/^\/api\/files\/(.+)$/)
    if (fileMatch) {
      const requestPath = fileMatch[1]
      
      // Security: prevent directory traversal
      const sanitizedPath = requestPath.replace(/\.\./g, '').replace(/^\/+/, '')
      const filePath = path.join(contentDir, `${sanitizedPath}.md`)
      
      // Check if file exists
      try {
        await fs.access(filePath)
      } catch {
        res.writeHead(404)
        res.end(JSON.stringify({ error: 'Content not found' }))
        return
      }
      
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const { data: frontmatter, content } = matter(fileContent)
      const htmlContent = await processMarkdown(content)
      
      res.writeHead(200)
      res.end(JSON.stringify({
        route: sanitizedPath,
        slug: path.basename(sanitizedPath),
        title: frontmatter.title,
        subtitle: frontmatter.subtitle,
        content: htmlContent,
        metadata: frontmatter
      }))
      return
    }
    
    res.writeHead(404)
    res.end(JSON.stringify({ error: 'Not found' }))
  } catch (error) {
    console.error('API Error:', error)
    res.writeHead(500)
    res.end(JSON.stringify({ error: 'Internal server error' }))
  }
}