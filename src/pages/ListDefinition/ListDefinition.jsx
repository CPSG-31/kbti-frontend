import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_ENDPOINT from '../../globals/apiEndpoint';
import useAuth from '../../hooks/useAuth';
import { PlusSvg } from '../../assets/icons';
import {
  Table,
  Paginate,
  TableDataDefinition,
  Loading,
  EmptyMessage,
} from '../../components';

import './ListDefinition.scss';

const ListDefinition = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token, logout } = useAuth();
  
  const fetchData = useCallback(async (queryCurrentPage = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_ENDPOINT.ADMIN_DEFINITIONS(queryCurrentPage), {
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
        await Swal.fire({
          title: 'Error',
          text: `${responseErrorMessage}, mohon login ulang!`,
          icon: 'error',
          timer: 2000,
        });
    
        logout();
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
      title: 'Apakah Anda Yakin?',
      text: 'Ingin menghapus definisi ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(API_ENDPOINT.DELETE_DEFINITION(id), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Swal.fire({
            title: 'Berhasil!',
            text: 'Definisi berhasil dihapus!',
            icon: 'success',
            timer: 2000,
          });
          await fetchData(data.data.length === 1 ? currentPage - 1 : currentPage);
        } catch (error) {
          const statusErrorMessage = error.response.data.code;
          const responseErrorMessage = error.response.data.message;
          
          if (statusErrorMessage === 401) {
            await Swal.fire({
              title: 'Error',
              text: `${responseErrorMessage}, mohon login ulang!`,
              icon: 'error',
              timer: 2000,
            });
  
            logout();
          } else {
            await Swal.fire({
              title: 'Error',
              text: statusErrorMessage,
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
    <section className="list__definition-admin">
      <h1>Data Definisi</h1>
      <Link to="/definitions/create" className="list__definition-admin__create-cta btn">
        <PlusSvg />
        Tambah Definisi
      </Link>
  
      {isLoading && <Loading />}
      {errorMessage && <EmptyMessage message="Tidak ada list definisi"/>}
      {data && (
        <>
          <Table
            items={data}
            currentPage={currentPage}
            totalItems={data.meta.total}
            component={<TableDataDefinition items={data} currentPage={currentPage} onDeleteDefinition={deleteDefinitionHandler}/>}
          />
          <Paginate pageCount={Math.ceil(data.meta.total / 10)} paginateChangeHandler={paginateChangeHandler}/>
        </>
      )}
    </section>
  );
};

export default ListDefinition;
