import AppLatestProjects from './AppLatestProjects.jsx'
import '../partials_scss/_jumbo.css'
import '../partials_scss/_scroll_prompt.css'
import { useEffect, useState } from 'react';

export default function AppJumbo() {
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


  return (
    <>
      <div className={`container jumbotron rounded-3 d-flex ${isMobile ? 'justify-content-center align-items-center flex-column' : 'ps-5 gap-5 justify-content-start'}`}>
        <div className="icons d-flex">
          <i className="devicon-css3-plain"></i>
          <i className="devicon-bootstrap-plain"></i>
          <i className="devicon-react-plain-wordmark"></i>
          <i className="devicon-vuejs-plain-wordmark"></i>
          <i className="devicon-mysql-plain-wordmark"></i>
          <i className="devicon-laravel-original"></i>
          <i className="devicon-php-plain"></i>
        </div>

        <div className={`left-side z-2 ${isMobile ? 'text-center' : ''}`}>
          <div className="title-box">
            <h1 className={`jumbo-title ${isMobile ? 'display-4' : ''}`}>
              Hei! I'm <span className="text-warning">Nico</span>
            </h1>
            <span className={`jumbo-title`} style={{ color: "#6d3ea3", lineHeight: '0.8' }}>
              Full Stack Developer.
            </span>
          </div>

          {isMobile ? (
            <p className="w-100 jumbo-pp-text">
              Welcome to my Portfolio. Here I collect some of my projects. Have fun!
            </p>
          ) : (
            <p className="w-100 jumbo-pp-text">
              Welcome to my Portfolio.<br />Here I collect some of my projects. Have fun!
            </p>
          )
          }

          <div className="download_cv_box">
            <a className="download_cv" target="_blank" rel="noreferrer" href="/assets/uploads/resume_portfolio.pdf">
              Resume
              <i className="fa fa-download" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>

      <AppLatestProjects />
    </>
  )
}