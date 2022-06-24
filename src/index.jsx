import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './styles/global.css';

import App from './App';
import AuthContextProvider from './store/authContext';

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>,
);

window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('/service-worker.js');
    console.log('Berhasil mendaftarkan service worker');
  } else {
    console.log('Browser tidak mendukung service worker');
  }
  
  if (!navigator.onLine) {
    Swal.fire({
      title: ' Tidak Ada Jaringan Internet (Offline)',
      text: 'Anda Tidak Bisa Mengakses Internet, Maka Aplikasi Masuk ke Dalam Mode Offline',
      icon: 'warning',
      confirmButtonText: 'ok',
    });
  }
});

window.addEventListener('offline', (event) => {
  Swal.fire({
    title: ' Tidak Ada Jaringan Internet (Offline)',
    text: 'Anda Tidak Bisa Mengakses Internet, Maka Aplikasi Masuk ke Dalam Mode Offline',
    icon: 'warning',
    confirmButtonText: 'ok',
  });
});

window.addEventListener('online', (event) => {
  Swal.fire({
    title: ' Ada Jaringan Internet (Online)',
    text: 'Anda Bisa Mengakses Internet, Maka Aplikasi Keluar dari Mode Offline',
    icon: 'success',
    confirmButtonText: 'ok',
  });
});
