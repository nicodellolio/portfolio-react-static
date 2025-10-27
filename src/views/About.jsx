import { useEffect, useMemo, useState } from 'react'
import '../partials_scss/_carousel.scss'

export default function About() {
  const technologies = useMemo(() => ([
    { icon: 'devicon-html5-plain-wordmark', name: 'HTML' },
    { icon: 'devicon-css3-plain', name: 'CSS' },
    { icon: 'devicon-sass-original colored', name: 'Sass' },
    { icon: 'devicon-bootstrap-plain', name: 'Bootstrap' },
    { icon: 'devicon-javascript-plain', name: 'JavaScript' },
    { icon: 'devicon-vitejs-plain', name: 'Vite' },
    { icon: 'devicon-react-plain', name: 'React' },
    { icon: 'devicon-vuejs-plain', name: 'VueJS' },
    { icon: 'devicon-github-original colored', name: 'GitHub' },
  ]), [])

  const [isTablet, setIsTablet] = useState(window.innerWidth < 992);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 460);
  const width = window.innerWidth;

  // Gestione ridimensionamento finestra per rilevamento mobile
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth < 992);
      setIsMobile(window.innerWidth < 460);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div style={{ width: isMobile ? '95%' : '80%' }} className="mt-5 container" id="about">
        <h1 style={{ fontSize: `${width / 10}px`, color: "#b083e2", fontWeight: 900, fontFamily: "Titillium Web, sans-serif" }} className="text-end">a bit about me</h1>
        <div className={`about-me d-flex gap-5 ${isTablet ? 'flex-column' : ''}`}>
          <img className={`rounded-5 object-fit-cover ${isTablet ? 'w-100 order-2' : 'w-50 order-1'}`}  src="/assets/uploads/about_img.jpg" alt="" />
          <div className="right-side">
            <p className="all-about-me">
              I’m a Full-Stack Web Developer with a creative background and a passion for building clean, responsive, and user-friendly web applications. My journey started in Australia, where I spent a year working as a video editor — and somewhere between beaches and deadlines, I discovered that what I really loved was coding.
              <br /><br />
              Since then, I’ve turned that curiosity into a profession. I completed a 6-month intensive full-stack course and have been working for the past year in a software house, mainly on front-end focused full-stack projects. I’ve built and maintained websites and web applications using CSS, JavaScript, React, Vue.js, PHP, Laravel, and MySQL, collaborating with designers and backend developers to deliver real features used by real clients.
              <br /><br />
              Today, I enjoy turning ideas into smooth digital experiences and writing code that’s both clean and maintainable. I love working in teams, solving problems, and learning new tools that make me better at what I do.
              <br />
              I’m currently looking for new job opportunities where I can grow, contribute, and build meaningful products. If my work speaks to you, feel free to reach out — I’m always happy to connect.
            </p>
          </div>
        </div>
      </div>
        <div className="small-chalk me-5">
          <p>what I comfortbly deal with <i className="fa-solid fa-arrow-down"></i></p>
        </div>
      <div className="slider">
        <div className="slide-track">
          {technologies.map((technology, idx) => (
            <div className="slide" key={idx}>
              <i className={technology.icon}><span>{technology.name}</span></i>
            </div>
          ))}
          {technologies.map((technology, idx) => (
            <div className="slide" key={`duplicate-${idx}`}>
              <i className={technology.icon}><span>{technology.name}</span></i>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}