import type { VercelRequest, VercelResponse } from '@vercel/node'
import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const contentDir = path.join(process.cwd(), 'content')

async function processMarkdown(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)
  return result.toString()
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { slug } = req.query
  
  if (!slug) {
    return res.status(400).json({ error: 'Invalid slug parameter' })
  }

  // Handle both string and array cases for dynamic routes
  const requestPath = Array.isArray(slug) ? slug.join('/') : slug
  
  // Security: prevent directory traversal
  const sanitizedPath = requestPath.replace(/\.\./g, '').replace(/^\/+/, '')
  const filePath = path.join(contentDir, `${sanitizedPath}.md`)

  try {
    // Log debugging info
    console.log('Current working directory:', process.cwd())
    console.log('Content directory path:', contentDir)
    console.log('Requested slug:', slug)
    console.log('File path:', filePath)
    
    // Check if file exists
    try {
      await fs.access(filePath)
    } catch {
      return res.status(404).json({ error: 'Content not found' })
    }
    
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(fileContent)
    const htmlContent = await processMarkdown(content)

    res.status(200).json({
      route: sanitizedPath,
      slug: path.basename(sanitizedPath),
      title: frontmatter.title,
      subtitle: frontmatter.subtitle,
      content: htmlContent,
      metadata: frontmatter
    })
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
      slug,
      path: filePath,
      cwd: process.cwd()
    })
  }
}