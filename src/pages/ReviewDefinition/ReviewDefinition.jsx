import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Paginate,
  Table,
  TableDataReviewDefinition,
  Loading,
  EmptyMessage,
} from '../../components';
import API_ENDPOINT from '../../globals/apiEndpoint';
import useAuth from '../../hooks/useAuth';

import './ReviewDefinition.scss';

const ReviewDefinition = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token, logout } = useAuth();
  
  const fetchData = useCallback(async (queryCurrentPage = 1) => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_ENDPOINT.ADMIN_DEFINITIONS_REVIEW(queryCurrentPage), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setCurrentPage(queryCurrentPage);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      const statusErrorMessage = error.response.status;
      const responseErrorMessage = error.response.data.message;
      
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
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
    <section className="review__definition-admin">
      <h1>Tinjau Definisi Baru</h1>
      {isLoading && <Loading />}
      {errorMessage && <EmptyMessage message="Tidak ada definisi yang bisa direview"/>}
      {data && (
        <>
          <Table
            items={data}
            currentPage={currentPage}
            totalItems={data.meta.total}
            component={<TableDataReviewDefinition items={data} currentPage={currentPage}/>}
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

export default ReviewDefinition;
