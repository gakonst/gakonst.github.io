import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useContent } from './hooks/useContent'
import Layout from './components/Layout'

export default function HomePage() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  const { data: content, isLoading, error } = useContent('home')

  const portoConnector = connectors.find(c => c.id === 'porto')

  if (isLoading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
  if (error || !content) return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Error loading content</div>

  return (
    <Layout>
      {/* Auth Section - hidden for now to match original */}
      {false && (
        <div className="auth-section">
          {isConnected ? (
            <div>
              <span style={{ marginRight: 10, fontSize: 14 }}>
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <button 
                className="auth-button" 
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button 
              className="auth-button"
              onClick={() => portoConnector && connect({ connector: portoConnector })}
              disabled={!portoConnector}
            >
              Connect with Porto
            </button>
          )}
        </div>
      )}


      {/* Main Content - already has proper divs and structure */}
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </Layout>
  )
}