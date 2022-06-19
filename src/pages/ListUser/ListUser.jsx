import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Paginate,
  Table,
  TableDataUser,
  Loading,
  EmptyMessage,
} from '../../components';
import './ListUser.scss';
import useAuth from '../../hooks/useAuth';
import API_ENDPOINT from '../../globals/apiEndpoint';

const ListUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token, logout } = useAuth();
  
  const fetchData = useCallback(async (queryCurrentPage = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_ENDPOINT.USERS(queryCurrentPage), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await setCurrentPage(queryCurrentPage);
      await setData(response.data);
      await setIsLoading(false);
    } catch (error) {
      const statusErrorMessage = error.response.status;
  
      if (statusErrorMessage === 401) {
        return logout('Authorization gagal, mohon login ulang!');
      }
      
      setIsLoading(false);
      setErrorMessage(responseErrorMessage);
    }
  }, []);
  
  const paginateChangeHandler = async (page) => {
    const currentPagePaginate = page.selected + 1;
    
    await fetchData(currentPagePaginate);
  };
  
  const deleteUserHandler = async (id) => {
    await Swal.fire({
      title: 'Apakah Anda Yakin?',
      text: 'Ingin menghapus user ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(API_ENDPOINT.DELETE_USER(id), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          Swal.fire({
            title: 'Berhasil!',
            text: 'User berhasil dihapus!',
            icon: 'success',
          });

          await fetchData(data.data.length === 1 ? currentPage - 1 : currentPage);
        } catch (error) {
          const statusErrorMessage = error.response.status;
          
          if (statusErrorMessage === 401) {
            return logout('Authorization gagal, mohon login ulang!');
          } else {
            Swal.fire({
              title: 'Gagal!',
              text: `${error.response.data.message}!`,
              icon: 'error',
              timer: 2000,
            });
          }
        }
      }
    });
  };
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
    <section className="list__user-admin">
      <h1>Kelola Pengguna</h1>
  
      {isLoading && <Loading />}
      {errorMessage && <EmptyMessage message="Tidak dapat menemukan user"/>}
      {data && (
        <>
          <Table
            items={data}
            currentPage={currentPage}
            totalItems={data.meta.total}
            component={<TableDataUser items={data} currentPage={currentPage} onDeleteUser={deleteUserHandler}/>}
          />
  
          <Paginate
            pageCount={Math.ceil(data.meta.total / 10)}
            paginateChangeHandler={paginateChangeHandler}
          />
        </>
      )}
    </section>
  );
};

export default ListUser;
