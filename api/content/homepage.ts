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
  try {
    const filePath = path.join(contentDir, 'homepage.md')
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(fileContent)
    const htmlContent = await processMarkdown(content)

    res.status(200).json({
      title: frontmatter.title,
      subtitle: frontmatter.subtitle,
      content: htmlContent,
      metadata: frontmatter
    })
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}