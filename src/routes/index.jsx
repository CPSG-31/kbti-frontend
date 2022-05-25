import React from 'react';
import { BrowsweRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import ErrorPage from '../pages/Error';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
