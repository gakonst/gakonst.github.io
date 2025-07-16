export interface ContentFile {
  route: string
  slug: string
  title: string
  subtitle?: string
  category?: string | null
  date?: string
  [key: string]: any
}

export interface ContentData {
  route: string
  slug: string
  title: string
  subtitle?: string
  content: string
  metadata: Record<string, any>
}