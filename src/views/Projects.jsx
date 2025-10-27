import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import GoUp from '../components/GoUp'
import '../partials_scss/Projects.css'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch('/assets/119_laravel-api_table_projects.json')
      .then(res => res.json())
      .then(data => {
        setProjects(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setProjects([])
        setLoading(false)
      })
  }, [])

  const ordered = useMemo(() => {
    let result = projects.slice().sort((a, b) => Number(b.id) - Number(a.id))
    if (filter) {
      result = result.filter(project => 
        project.title.toLowerCase().includes(filter.toLowerCase()) ||
        project.description.toLowerCase().includes(filter.toLowerCase())
      )
    }
    return result
  }, [projects, filter])

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h1 className="projects-title">I miei progetti</h1>
        <p className="projects-subtitle">Esplora i progetti che ho realizzato</p>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Cerca progetti..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {ordered.length === 0 ? (
            <div className="no-projects">
              <h3>Nessun progetto trovato</h3>
              {filter && <button className="btn btn-outline-primary" onClick={() => setFilter('')}>Cancella filtro</button>}
            </div>
          ) : (
            <div className="projects-grid row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {ordered.map(project => (
                <div className="col" key={project.id}>
                  <div className="projects-card d-flex flex-column h-100">
                  <div className="projects-image-container position-relative">
                    <img 
                      src={`/${project.preview_image}`} 
                      onError={handleImgError} 
                      className="projects-image" 
                      alt={project.title} 
                      loading="lazy"
                    />
                    <div className="position-absolute bottom-0 start-0 w-100 p-3">
                      <h3 className="projects-card-title mb-1">{project.title}</h3>
                    </div>
                    <div className="projects-overlay">
                      <Link to={`/projects/${project.id}`} className="projects-btn-details">
                        Scopri di più
                      </Link>
                    </div>
                  </div>
                  <div className="projects-card-content">
                    <p className="projects-card-description">
                      {project.description.length > 100 
                        ? `${project.description.substring(0, 100)}...` 
                        : project.description}
                    </p>
                  </div>
                </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <GoUp />
    </div>
  )
}

const handleImgError = (e) => { e.currentTarget.src = '/png-not-found.png' }