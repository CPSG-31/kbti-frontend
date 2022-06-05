import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavbarAdmin } from '../../components';

function AdminLayout() {
  const location = useLocation();

  return (
    <>
      <header>
        <NavbarAdmin />
      </header>
      <main>
        {location.pathname === '/dashboard' ? <p>Statistic</p> : <Outlet />}
      </main>
      <footer>
        This is footer
      </footer>
    </>
  );
}

export default AdminLayout;
