import { useEffect, useState } from 'react'
import AOS from 'aos'
import { useLocation } from 'react-router-dom'
import '../partials_scss/_contacts_modern.css'

export default function Contacts() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('email')
  const [copied, setCopied] = useState(false)
  
  useEffect(() => {
    AOS.refresh()
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText('nico.dellolio18@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div id='contacts' className={`contacts-container ${location.pathname === '/contacts' ? 'full-page' : ''}`}>
      <div className="contacts-card" data-aos="fade-up">
        <div className="card-header">
          <h1>Connect With Me</h1>
          <p className="subtitle">Let's create something amazing together</p>
        </div>
        
        <div className="contact-tabs">
          <button 
            className={`tab-btn ${activeTab === 'email' ? 'active contact-section-active' : ''}`}
            onClick={() => setActiveTab('email')}
          >
            <i className="fa-regular fa-envelope"></i>
            <span>Email</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'social' ? 'active contact-section-active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            <i className="fa-solid fa-share-nodes"></i>
            <span>Social</span>
          </button>
          <button 
            className={`tab-btn ${activeTab === 'project' ? 'active contact-section-active' : ''}`}
            onClick={() => setActiveTab('project')}
          >
            <i className="fa-solid fa-code"></i>
            <span>Project</span>
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'email' && (
            <div className="contact-email-content" data-aos="fade-right">
              <div className="email-card">
                <div className="email-header">
                  <i className="fa-solid fa-envelope-open-text"></i>
                  <h3>Send me an email</h3>
                </div>
                <div className="email-address">
                  <p style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1.1rem)' }}>nico.dellolio18@gmail.com</p>
                  <button className="copy-btn" onClick={copyEmail}>
                    {copied ? <i className="fa-solid fa-check"></i> : <i className="fa-regular fa-copy"></i>}
                  </button>
                </div>
                <a href="mailto:nico.dellolio18@gmail.com" className="email-btn">
                  <i className="fa-solid fa-paper-plane"></i> Compose Email
                </a>
              </div>
            </div>
          )}
          
          {activeTab === 'social' && (
            <div className="contact-social-content" data-aos="fade-right">
              <div className="social-links">
                <a href="https://github.com/nicodellolio" target="_blank" rel="noreferrer" className="social-card github">
                  <i className="devicon-github-original"></i>
                  <div className="social-info">
                    <h3>GitHub</h3>
                    <p>Check out my code repositories</p>
                  </div>
                </a>
                
                <a href="https://www.linkedin.com/in/nicola-dell%E2%80%99olio-2518a1238/" target="_blank" rel="noreferrer" className="social-card linkedin">
                  <i className="fa-brands fa-linkedin"></i>
                  <div className="contact-social-info">
                    <h3>LinkedIn</h3>
                    <p>Connect with me professionally</p>
                  </div>
                </a>
              </div>
            </div>
          )}
          
          {activeTab === 'project' && (
            <div className="contact-project-content" data-aos="fade-right">
              <div className="contact-project-info">
                <h3>Portfolio Project</h3>
                <p>Interested in how this portfolio was built?</p>
                <a href="https://github.com/nicodellolio/vite-boolfolio-static" target="_blank" rel="noreferrer" className="repo-btn">
                  <i className="fa-brands fa-github"></i> View Repository
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}