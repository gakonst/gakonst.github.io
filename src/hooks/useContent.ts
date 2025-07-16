import { useQuery } from '@tanstack/react-query'
import type { ContentFile, ContentData } from '../types'

export function useContentList() {
  return useQuery({
    queryKey: ['files'],
    queryFn: async () => {
      const res = await fetch('/api/files')
      if (!res.ok) throw new Error('Failed to fetch file list')
      const data = await res.json()
      return data.files as ContentFile[]
    },
  })
}

export function useContent(route: string | undefined) {
  return useQuery({
    queryKey: ['content', route],
    queryFn: async () => {
      if (!route) throw new Error('No route provided')
      const res = await fetch(`/api/files/${route}`)
      if (!res.ok) throw new Error('Failed to fetch content')
      return res.json() as Promise<ContentData>
    },
    enabled: !!route,
  })
}