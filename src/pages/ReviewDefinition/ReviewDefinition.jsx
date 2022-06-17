import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Paginate,
  Table, TableDataReviewDefinition,
} from '../../components';
import API_ENDPOINT from '../../globals/apiEndpoint';
import useAuth from '../../hooks/useAuth';

import './ReviewDefinition.scss';

const ReviewDefinition = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(null);
  const { token } = useAuth();
  
  const fetchData = useCallback(async (queryCurrentPage = 1) => {
    try {
      const response = await axios.get(API_ENDPOINT.ADMIN_DEFINITIONS_REVIEW(queryCurrentPage), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      await setCurrentPage(queryCurrentPage);
      await setData(response.data);
    } catch (error) {
      console.warn(error);
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
