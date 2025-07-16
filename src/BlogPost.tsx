import { useParams } from 'react-router-dom'
import { useContent } from './hooks/useContent'
import Layout from './components/Layout'

export default function BlogPost() {
  const { '*': route } = useParams()

  // Need to prepend 'writings/' since the route only captures the part after /writings/
  const fullPath = route ? `writings/${route}` : undefined
  const { data: content, isLoading, error } = useContent(fullPath)

  if (isLoading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
  if (error || !content) return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Error loading content</div>

  return (
    <Layout>
      {/* Header */}
      <div id="preamble">
        <h1 className="title">{content.title}</h1>
        {content.subtitle && (
          <h1 className="subtitle">{content.subtitle}</h1>
        )}
      </div>

      {/* Main Content */}
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </Layout>
  )
}