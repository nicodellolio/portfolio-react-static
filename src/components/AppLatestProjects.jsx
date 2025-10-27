import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import './AppLatestProjects.css'

export default function AppLatestProjects() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('/assets/119_laravel-api_table_projects.json')
      .then(res => res.json())
      .then(data => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
  }, [])

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

  const latest = useMemo(() => {
    return projects
      .slice()
      .sort((a, b) => Number(b.id) - Number(a.id))
      .slice(0, 3)
  }, [projects])

  // const handleImgError = (e) => { e.currentTarget.src = '/png-not-found.png' }

  return (
    <>
      <img className="jumbo-img" src="/assets/uploads/jumbo.png" alt="Background decoration" />

      <img
        className="laptop-code-icon"
        style={{
          width: '50%',
          position: 'absolute',
          top: '70%',
          right: '-25%',
          transform: 'translate(-50%, -50%)',
          zIndex: -100,
          overflow: 'hidden',
        }}
        src="/assets/uploads/com-laptop-code-svgrepo-com.png"
        alt="Laptop code icon"
      />

      <div className={`container latest-projects ${isMobile ? 'px-3' : 'p-5'}`} style={{ width: isMobile ? '95%' : '80%' }} id="latest-projects">
        <div style={{ position: 'relative' }}>
          <h1 className={`page_title ${isMobile ? 'text-center' : ''}`}>Latest projects</h1>
        </div>
        <div className="row flex-column g-4 my-2" >
          {latest.map(project => (
            <div className="" key={project.id}>
              <div className="myCard">
                <div className="title_box d-flex rounded-top-4 justify-content-between align-items-center px-3">
                  <h5 className="card-title fs-2 m-0">{project.title}</h5>
                  <Link to={`/projects/${project.id}`} className="btn btn-dark">Read more</Link>
                </div>
                {/* <img src={`/${project.preview_image}`} onError={handleImgError} className="card-img-top" alt={project.title} /> */}
                <div className="card-body rounded-bottom-4">
                  <p className="card-text fs-5">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center px-2">
            <a href="/projects" className="btn btn-primary text-light w-100 rounded-4">View all projects</a>
          </div>
        </div>
      </div>
    </>
  )
}