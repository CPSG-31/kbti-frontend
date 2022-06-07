import { Outlet } from 'react-router-dom';
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
      © 2022 KBTI  - Term of use - About
      </footer>
    </>
  );
};

export default PublicLayout;