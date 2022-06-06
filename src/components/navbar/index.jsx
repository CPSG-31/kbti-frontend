/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
import React from 'react';
import './navbar.css';

function Navbar() {
  return (
    <nav className="bg-denim-900 flex px-2 sm:px-4 py-2.5">
      <div className="nav__logo text-citrus font-bold">
        <h1>KBTI</h1>
      </div>
      <div className="nav__menu text-white flex content-between text-red">
        <ul className="nav__dropdown flex  mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
          <li>
            <button type="dropdown">About</button>
          </li>
          <li>
            <button type="dropdown">Services</button>
          </li>
        </ul>
        <ul className="nav__dropdown flex mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
          <li>
            <a
              href="#"
              className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              aria-current="page"
            >
              Masuk
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              aria-current="page"
            >
              Daftar
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
