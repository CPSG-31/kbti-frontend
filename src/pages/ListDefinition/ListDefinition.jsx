import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PlusSvg } from '../../assets/icons';
import {
  Table,
  Paginate,
  TableDataDefinition,
} from '../../components';

import './ListDefinition.scss';
import API_ENDPOINT from '../../globals/apiEndpoint';
import useAuth from '../../hooks/useAuth';

const ListDefinition = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const { token } = useAuth();
  
  const fetchData = useCallback(async (queryCurrentPage = 1) => {
    try {
      const response = await axios.get(API_ENDPOINT.ADMIN_DEFINITIONS(queryCurrentPage), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      await setData(response.data);
    } catch (error) {
      console.warn(error);
    }
  }, []);
  
  const paginateChangeHandler = async (page) => {
    const currentPagePaginate = page.selected + 1;
    
    fetchData(currentPagePaginate);
    setCurrentPage(currentPagePaginate);
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
          fetchData();
        } catch (error) {
          Swal.fire({
            title: 'Gagal!',
            text: `${error.response.data.message}!`,
            icon: 'error',
            timer: 2000,
          });
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
