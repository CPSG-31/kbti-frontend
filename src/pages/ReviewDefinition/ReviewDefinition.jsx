import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Paginate,
  Table, TableDataReviewDefinition,
} from '../../components';

import './ReviewDefinition.scss';

const ReviewDefinition = () => {
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  
  const fetchData = async (queryCurrentPage = 1) => {
    const response = await axios.get(`http://localhost:3001/definitions?_page=${queryCurrentPage}&_limit=10`);
    const totalData = response.headers['x-total-count'];
    const totalPages = Math.ceil(totalData / 10);
    
    setPageCount(totalPages);
    setTotalItems(totalData);
    return response.data;
  };
  
  useEffect(() => {
    const firstTimeFetchData = async () => {
      const data = await fetchData();
      setItems(data);
    };
    
    firstTimeFetchData();
  }, []);
  
  const paginateChangeHandler = async (page) => {
    const currentPagePaginate = page.selected + 1;
    
    const fetchNewData = await fetchData(currentPagePaginate);
    setItems(fetchNewData);
    setCurrentPage(currentPagePaginate);
  };
  
  return (
    <section className="review__definition-admin">
      <h1>Tinjau Definisi Baru</h1>
      
      <Table
        items={items}
        currentPage={currentPage}
        totalItems={totalItems}
        component={<TableDataReviewDefinition items={items} currentPage={currentPage}/>}
      />
      
      <Paginate
        pageCount={pageCount}
        paginateChangeHandler={paginateChangeHandler}
      />
    </section>
  );
};

export default ReviewDefinition;
