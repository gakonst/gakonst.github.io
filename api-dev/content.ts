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

export async function handleContentApi(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || '', `http://${req.headers.host}`)
  
  res.setHeader('Content-Type', 'application/json')
  
  try {
    if (url.pathname === '/api/content/homepage') {
      // Read the single homepage file
      const filePath = path.join(contentDir, 'homepage.md')
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const { data: frontmatter, content } = matter(fileContent)
      const htmlContent = await processMarkdown(content)
      
      res.writeHead(200)
      res.end(JSON.stringify({
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