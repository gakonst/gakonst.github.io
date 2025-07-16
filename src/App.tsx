import { Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import WritingsList from './WritingsList'
import BlogPost from './BlogPost'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'
import NavBar from './NavBar'

export default function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/writings" element={<WritingsList />} />
        <Route path="/writings/*" element={<BlogPost />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  )
}