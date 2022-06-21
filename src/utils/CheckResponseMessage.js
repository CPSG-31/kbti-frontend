import useAuth from '../hooks/useAuth';

const UseCheckResponseMessage = async ({ status, message }) => {
  const { logout } = useAuth();
  
  if (status === 401) {
    logout('Authorization gagal atau sesi telah berakhir, silahkan login kembali');
  } else if (status === 500) {
    return 'Terjadi kesalahan pada server, silahkan coba lagi';
  } else if (status === 404) {
    return message || 'Data tidak ditemukan';
  } else if (status === 422) {
    await Swal.fire({
      title: 'Gagal',
      text: 'Data tidak valid',
      icon: 'error',
      timer: 2000,
    });
  } else if (status === 403) {
    await Swal.fire({
      title: 'Gagal',
      text: 'Akses ditolak',
      icon: 'error',
      timer: 2000,
    });
  } else if (status === 200 || status === 201) {
    await Swal.fire({
      title: 'Berhasil',
      text: message || 'Data berhasil disimpan',
      icon: 'success',
      timer: 2000,
    });
  }
};

export default UseCheckResponseMessage;
