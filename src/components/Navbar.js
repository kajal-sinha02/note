import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {


  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark-custom">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">MEMOMATE</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            { (localStorage.getItem('token')) && <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>
}
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
            </li>
          </ul>
          {!(localStorage.getItem('token')) ? (
            <form className="d-flex">
              <Link className="btn btn-outline-light mx-2" to="/login" role="button">Login</Link>
              <Link className="btn btn-outline-light mx-2" to="/signup" role="button">SignUp</Link>
            </form>
          ) : <button className='btn btn-outline-light mx-2' onClick={handleLogout}>Logout</button>}
        </div>
       
      </div>
    </nav>
  );
};

export default Navbar;
