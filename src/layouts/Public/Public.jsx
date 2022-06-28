import { Outlet, Link } from 'react-router-dom';
import { NavbarPublic } from '../../components';
import './Public.css';

const PublicLayout = () => {
  return (
    <>
      <header>
        <NavbarPublic />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="text-center py-3 text-light footer-user">
      © 2022 KBTI  -
        <Link className="text-white" to="/about-us">Tentang Kami</Link>
      </footer>
    </>
  );
};

export default PublicLayout;
