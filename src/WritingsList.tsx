import { Link } from 'react-router-dom'
import { useContentList } from './hooks/useContent'
import Layout from './components/Layout'

export default function WritingsList() {
  const { data: fileList, isLoading, error } = useContentList()

  if (isLoading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
  if (error) return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Error loading writings</div>

  // Filter only writings
  const writings = fileList?.filter(f => f.category === 'writings') || []

  return (
    <Layout>

      {/* Writings list */}
      <div id="content">
        <div className="org-src-container">
          {writings.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No writings yet.</p>
          ) : (
            writings.map(writing => (
              <div key={writing.route} style={{ marginBottom: '30px' }}>
                <Link 
                  to={`/${writing.route}`} 
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <h3 style={{ marginBottom: '5px' }}>
                    <i>{writing.title}</i>
                  </h3>
                  {writing.subtitle && (
                    <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#666' }}>
                      {writing.subtitle}
                    </p>
                  )}
                  {writing.date && (
                    <p style={{ margin: '0', fontSize: '12px', color: '#999' }}>
                      {new Date(writing.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  )}
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  )
}