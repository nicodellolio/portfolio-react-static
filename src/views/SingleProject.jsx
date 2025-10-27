import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import GoUp from '../components/GoUp'
import '../partials_scss/SingleProject.css'

export default function SingleProject() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [technologies, setTechnologies] = useState([])
  const [pivot, setPivot] = useState([])
  const [loading, setLoading] = useState(true)

  const [isMobile, setIsMobile] = useState(window.innerWidth < 460);
  const width = window.innerWidth;

  // Gestione ridimensionamento finestra per rilevamento mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(width < 460);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch('/assets/119_laravel-api_table_projects.json').then(r => r.json()),
      fetch('/assets/119_laravel-api_table_technologies.json').then(r => r.json()),
      fetch('/assets/119_laravel-api_table_project_technology.json').then(r => r.json()),
    ])
      .then(([projects, techs, piv]) => {
        setProject(projects.find(p => String(p.id) === String(id)) || null)
        setTechnologies(techs)
        setPivot(piv)
        setLoading(false)
      })
      .catch(() => {
        setProject(null)
        setLoading(false)
      })
  }, [id])

  const techList = useMemo(() => {
    if (!project) return []
    const ids = pivot.filter(e => String(e.project_id) === String(project.id)).map(e => e.technology_id)
    return technologies.filter(t => ids.includes(t.id))
  }, [project, technologies, pivot])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="not-found-container">
        <h1 className="not-found-title">Project not found</h1>
        <p className="not-found-text">We couldn't find the project you're looking for.</p>
        <Link to="/projects" className="project-link demo-link">
          <i className="fa-solid fa-arrow-left"></i> Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div className="single-project-container">
      <div className="project-header">
        <h1 className="project-title" style={{ fontSize: isMobile ? '50px' : null }}>{project.title}</h1>
        <Link to="/projects" className="back-button">
          <i className="fa-solid fa-arrow-left"></i> Back to Projects
        </Link>
      </div>
      
      <div className="project-content">
        <p className="project-description">{project.description}</p>
        
        <div className="project-meta">
          <div className="meta-section">
            <h3 className="meta-title">
              <i className="fa-regular fa-calendar"></i> Project Duration
            </h3>
            <div className="duration-value">{project.project_duration}</div>
          </div>
          
          {techList.length > 0 && (
            <div className="meta-section">
              <h3 className="meta-title">
                <i className="fa-solid fa-code"></i> Technologies Used
              </h3>
              <div className="tech-list">
                <ul>
                  {techList.map((t) => (
                    <li key={t.id}>{t.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        
        <div className="project-links">
          {project.link_to_source_code && (
            <a href={project.link_to_source_code} target="_blank" rel="noreferrer" className="project-link source-link">
              <i className="fa-brands fa-github"></i> View Source Code
            </a>
          )}
          {project.link_to_project_view && (
            <a href={project.link_to_project_view} target="_blank" rel="noreferrer" className="project-link demo-link">
              <i className="fa-solid fa-up-right-from-square"></i> View Demo
            </a>
          )}
        </div>
      </div>

      <div className="project-image-container">
        <img 
          src={`/${project.preview_image}`} 
          onError={handleImgError} 
          className="project-image" 
          alt={project.title} 
        />
      </div>
      
      <GoUp />
    </div>
  )
}

const handleImgError = (e) => { e.currentTarget.src = '/png-not-found.png' }