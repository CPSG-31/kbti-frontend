import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './ListDeletedDefinition.scss';
import {
  Paginate,
  Table,
  TableDataDeletedDefinition,
  Loading,
  EmptyMessage,
} from '../../components';
import API_ENDPOINT from '../../globals/apiEndpoint';
import useAuth from '../../hooks/useAuth';

const ListDeletedDefinition = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token, logout } = useAuth();
  
  const fetchData = useCallback(async (queryCurrentPage = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_ENDPOINT.ADMIN_DEFINITIONS_DELETED(queryCurrentPage), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setCurrentPage(queryCurrentPage);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      const statusErrorMessage = error.response.data.code;
      const responseErrorMessage = error.response.data.message;
  
      if (statusErrorMessage === 401) {
        return logout('Authorization gagal, mohon login ulang!');
      } else if (statusErrorMessage === 500) {
        setIsLoading(false);
        return setErrorMessage('Terjadi kesalahan pada server!');
      }
      
      setIsLoading(false);
      setErrorMessage(responseErrorMessage);
    }
  }, []);
  
  const paginateChangeHandler = async (page) => {
    const currentPagePaginate = page.selected + 1;
    
    await fetchData(currentPagePaginate);
  };
  
  const deleteDefinitionHandler = async (id) => {
    await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Ingin menghapus definisi ini secara permanent!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(API_ENDPOINT.ADMIN_ACTION_DEFINITION_DELETE(id), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          Swal.fire({
            title: 'Berhasil!',
            text: 'Definisi berhasil dihapus permanent!',
            icon: 'success',
            timer: 2000,
          });
          
          await fetchData(data.data.length === 1 ? currentPage - 1 : currentPage);
        } catch (error) {
          const statusErrorMessage = error.response.data.code;
          
          if (statusErrorMessage === 401) {
            return logout('Authorization gagal, mohon login ulang!');
          } else {
            await Swal.fire({
              title: 'Gagal',
              text: 'Gagal menghapus permanen definisi!',
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
    <section className="deleted__definition-admin">
      <h1>Definisi yang Dihapus</h1>
  
      {isLoading && <Loading />}
      {errorMessage && <EmptyMessage message="Tidak ada list definisi yang bisa dihapus" />}
      {data && !errorMessage && (
        <>
          <Table
            items={data}
            currentPage={currentPage}
            totalItems={data.meta.total}
            component={<TableDataDeletedDefinition items={data} currentPage={currentPage} onDeleteDefinition={deleteDefinitionHandler}/>}
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

export default ListDeletedDefinition;
