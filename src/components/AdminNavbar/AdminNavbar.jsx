import { Link, NavLink, useLocation } from 'react-router-dom';
import navbarLogo from '../../assets/images/logo/logo-yellow.png';
import {
  CloseIcon,
  GridIcon,
  UserIcon,
  LogoutIcon,
  BookIcon,
} from '../../assets/icons';

import './AdminNavbar.scss';

const AdminNavbar = ({ toggleClass, onClose }) => {
  const location = useLocation();
  
  const toggleClassHandler = () => {
    onClose();
  };
  
  return (
    <nav className={toggleClass ? 'nv nav-active' : 'nv'}>
      <div className="nv__header d-flex justify-content-between align-items-center">
        <Link to="/" ><img src={navbarLogo} alt="KBTI Logo" width={90} height={40}/></Link>
        <button className="btn text-end d-lg-none d-block nv__close" type="button" onClick={toggleClassHandler}>
          <CloseIcon />
        </button>
      </div>
      <ul className="nv__list">
        <li className="nv__list-item">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            <GridIcon />
            Dashboard
          </NavLink>
        </li>
        <li className="dropdown nv__list-item">
            <button className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <BookIcon />
              Kelola Definisi
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li className="nv__list-item">
                <NavLink to="/dashboard/definitions" className={({ isActive }) => isActive ? 'active' : ''}>Data Definisi</NavLink>
              </li>
              <li className="nv__list-item">
                <NavLink to="/dashboard/review-definitions" className={({ isActive }) => isActive ? 'active' : ''}>Tinjau Definisi Baru</NavLink>
              </li>
              <li className="nv__list-item">
                <NavLink to="/dashboard/deleted-definitions" className={({ isActive }) => isActive ? 'active' : ''}>Definisi yang dihapus</NavLink>
              </li>
            </ul>
        </li>
        <li className="nv__list-item">
          <NavLink to="/dashboard/users" className={({ isActive }) => isActive ? 'active' : ''}>
            <UserIcon />
            Kelola Pengguna
          </NavLink>
        </li>
        <li className="nv__list-item">
          <button type="button">
            <LogoutIcon />
            Keluar
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
