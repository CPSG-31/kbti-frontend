/* eslint-disable no-unused-expressions */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/Public';
import PrivateLayout from './layouts/Private';
import AdminLayout from './layouts/Admin';
// import Home from './pages/Home';
import ErrorPage from './pages/Error';

function App() {
  const roles = [
    { role: 'admin', isLogin: true },
    { role: 'admin', isLogin: false },
    { role: 'user', isLogin: true },
    { role: 'user', isLogin: false },
  ];
  const { role: currentRole, isLogin } = roles[2];

  const checkRole = currentRole === 'user' ? <PrivateLayout /> : <AdminLayout />;

  const dashboard = isLogin ? checkRole : <PublicLayout />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={dashboard} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
