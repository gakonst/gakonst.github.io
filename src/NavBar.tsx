import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'home' },
    { path: '/writings', label: 'writings' },
    { path: '/about', label: 'about' },
    { path: '/contact', label: 'contact' },
  ]

  return (
    <nav style={{
      borderBottom: '1px solid #eee',
      paddingBottom: '20px',
      marginBottom: '30px',
      textAlign: 'center'
    }}>
      <h1 className="title" style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Georgios Konstantopoulos
        </Link>
      </h1>
      <div>
        {navItems.map((item, index) => (
          <span key={item.path}>
            <Link
              to={item.path}
              style={{
                color: location.pathname === item.path ? '#000' : '#0070f3',
                textDecoration: location.pathname === item.path ? 'underline' : 'none',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal',
              }}
            >
              {item.label}
            </Link>
            {index < navItems.length - 1 && <span style={{ margin: '0 15px' }}>·</span>}
          </span>
        ))}
      </div>
    </nav>
  )
}