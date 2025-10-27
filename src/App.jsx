import { useEffect } from 'react'
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import AppHeader from './components/AppHeader.jsx'
import Home from './views/Home.jsx'
import About from './views/About.jsx'
import Contacts from './views/Contacts.jsx'
import Projects from './views/Projects.jsx'
import SingleProject from './views/SingleProject.jsx'
import GoUp from './components/GoUp.jsx'



export default function App() {
  const location = useLocation()

  useEffect(() => {
    AOS.init({ duration: 800 })
  }, [])

  // Per mantenere l'anchor /about -> #about quando arriva dalla home
  const aboutToAnchor = location.pathname === '/'

  return (
    <>
      <AppHeader aboutToAnchor={aboutToAnchor} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<SingleProject />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <GoUp/>
    </>
  )
}

function NotFound() {
  return (
    <div className="container py-5">
      <h1 className="page_title">404 - Page not found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-dark">Back to Home</Link>
    </div>
  )
}
