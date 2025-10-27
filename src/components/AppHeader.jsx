import { Link, NavLink } from "react-router-dom";
import './AppHeader.css';

export default function AppHeader() {
  // const location = useLocation();
  // const isHome = location.pathname === '/' || location.pathname === '/#about';

  return (
    <nav className="d-flex border-bottom border-1 border-secondary align-items-center" id="top"
      style={{ padding: '0 15%' }}>

      {/* Desktop View */}
      <ul className="list-unstyled gap-4 my-2 pt-3 not-mobile-view">
        <li className="nav-item d-flex gap-4 align-items-center">
          <NavLink className={({ isActive }) =>
            `nav-item-pp text-decoration-none ${isActive ? 'active-item' : ''}`}
            to="/">home</NavLink>
          <NavLink className={({ isActive }) =>
            `nav-item-pp text-decoration-none ${isActive ? 'active-item' : ''}`}
            to="/projects">projects</NavLink>
          <NavLink className={({ isActive }) => 
              `nav-item-pp text-decoration-none ${isActive ? 'active-item' : ''}`} 
              to="/about">about</NavLink>
          <NavLink className={({ isActive }) => 
            `nav-item-pp text-decoration-none ${isActive ? 'active-item' : ''}`} 
            to="/contacts">contacts</NavLink>
        </li>
      </ul>

      {/* Mobile View */}
      <ul className="list-unstyled gap-4 my-2 pt-3 mobile-view">
        <li className="nav-item d-flex gap-5 align-items-center">
          <NavLink className={({ isActive }) =>
            `nav-item-pp text-decoration-none ${isActive ? 'active-item' : ''}`}
            to="/">
            <i className="fa fa-home" aria-hidden="true"></i>
          </NavLink>
          <NavLink className={({ isActive }) =>
            `nav-item-pp text-decoration-none ${isActive ? 'active-item' : ''}`}
            to="/projects">
            <i className="fa fa-briefcase" aria-hidden="true"></i>
          </NavLink>
          <NavLink className={({ isActive }) => 
              `nav-item-pp text-decoration-none ${isActive ? 'active-item' : ''}`} 
              to="/about">
              <i className="fa fa-user" aria-hidden="true"></i>
          </NavLink>
          <NavLink className={({ isActive }) => 
            `nav-item-pp text-decoration-none ${isActive ? 'active-item' : ''}`} 
            to="/contacts">
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

