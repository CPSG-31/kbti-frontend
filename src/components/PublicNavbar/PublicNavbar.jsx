/* eslint-disable react/no-this-in-sfc */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import './PublicNavbar.css';
import Logo from '../../assets/images/logo/logo-yellow.png';

function PublicNavbar() {
  const { isLoggedIn, role_id: roleId, token, logout } = useAuth();
  const [categories, setCategories] = useState([]);
  const role = roleId === 1 ? 'admin' : 'user';
  let actionNavbar;

  const fetchCategories = async () => {
    const response = await axios.get('https://kbti-api.herokuapp.com/categories');
    const categoryData = response.data;

    return categoryData;
  };
  
  const logoutHandler = () => {
    logout();
  };

  useEffect(() => {
    const firstTimeFetchData = async () => {
      const response = await fetchCategories();
      setCategories(response.data);
    };
    
    firstTimeFetchData();
  }, []);

  
  const categoryElements = (categoryList) => categoryList && categoryList.map((categoryItem) => {
    return (
      <li key={categoryItem.id}>
        <Link className="dropdown-item category-item" to={`/definitions?categoryId=${categoryItem.id}`}>
          {categoryItem.category}
        </Link>
      </li>
    );
  });

  // const a = categoryElementList && console.log(categoryElementList);


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
          <button onClick={logoutHandler} className="btn btn-light rounded-pill fw-bold pt-2">Logout</button>
        </li>
      </>
    );
  }

  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  return (
    <nav className="navbar navbar-dark navbar-expand-md">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
        >
          <img src={Logo} alt="logo" />
        </Link>
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
                        <Link
                          to={`/search?q=${letter}`}
                          type="button"
                          className="col-1 btn btn-outline-warning rounded-circle fw-bold"
                          key={index}
                        >
                          {letter}
                        </Link>
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
                {categoryElements(categories)}
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
