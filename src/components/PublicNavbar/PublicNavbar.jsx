/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './PublicNavbar.css';

function PublicNavbar() {
  const { isLoggedIn, role_id: roleId, token, logout } = useAuth();
  const role = roleId === 1 ? 'admin' : 'user';

  let actionNavbar;
  if ((!token && !isLoggedIn) || (role !== 'admin' && role !== 'user')) {
    actionNavbar = (
      <>
        <li className="nav-item my-auto me-3">
          <Link className="btn btn-outline-light d-inline-block rounded-pill fw-bold pt-2 h-50" to="/login">Login</Link>
        </li>
        <li className="nav-item my-auto">
          <Link className="btn btn-light d-inline-block rounded-pill fw-bold pt-2" to="/register">Register</Link>
        </li>
      </>
    );
  } else if (token && (role === 'admin' || role === 'user') && isLoggedIn) {
    actionNavbar = (
      <>
        <li className="nav-item my-auto me-3">
          <Link to="/dashboard" className="btn btn-outline-light d-inline-block rounded-pill fw-bold pt-2 h-50">Dashboard</Link>
        </li>
        <li className="nav-item my-auto">
          <button onClick={logout} className="btn btn-light d-inline-block rounded-pill fw-bold pt-2">Logout</button>
        </li>
      </>
    );
  }

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  return (
    <nav className="navbar navbar-dark navbar-expand-md">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="./logo-yellow.png" alt="logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav d-flex justify-content-between">
            <div className="nav__dropdown-menu d-md-flex">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Indeks
                </a>
                <div
                  className="dropdown-menu container px-4"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <div className="row gap-2">
                    {alphabet.map((letter, index) => {
                      return (
                        <button
                          type="button"
                          className="col-1 btn btn-outline-warning rounded-circle fw-bold"
                          key={index}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-light"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Kategori
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item category-item" href="#">
                      Internet
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item category-item" href="#">
                      Pemrograman
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item category-item" href="#">
                      Jaringan
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item category-item" href="#">
                      dll.
                    </a>
                  </li>
                </ul>
              </li>
            </div>
            <div className="nav__action d-flex my-3 my-md-0 mt-4 mt-md-0">
                {actionNavbar}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default PublicNavbar;
