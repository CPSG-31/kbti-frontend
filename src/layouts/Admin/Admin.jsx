import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavbarAdmin, Footer } from '../../components';
import './Admin.scss';

function AdminLayout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const openNavbarHandler = () => setIsOpen(true);
  
  const closeNavbarHandler = () => setIsOpen(false);
  
  return (
    <>
      <div className="admin-layout d-flex">
        <header>
          <NavbarAdmin toggleClass={isOpen} onClose={closeNavbarHandler}/>
        </header>
        <div className="w-100 d-flex flex-column admin-layout__body">
          <main>
            {!isOpen && (
              <div className="nav__drawer-container d-block d-lg-none">
                <button type="button" className="btn nav__drawer-container-item" onClick={openNavbarHandler}>☰</button>
              </div>
            )}
            {location.pathname === '/dashboard' ? <p>Statistic</p> : <Outlet />}
          </main>
          <footer className="px-3 px-lg-5 footer-admin">
            <Footer />
          </footer>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;
