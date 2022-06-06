import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PlusSvg } from '../../assets/icons';
import {
  Table,
  Paginate,
  TableDataDefinition,
} from '../../components';

import './ListDefinition.scss';

const ListDefinition = () => {
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
    <section className="list__definition-admin">
      <h1>Data Definisi</h1>
      <Link to="/create-definition" className="list__definition-admin__create-cta btn">
        <PlusSvg />
        Tambah Definisi
      </Link>
      
      <Table
        items={items}
        currentPage={currentPage}
        totalItems={totalItems}
        component={<TableDataDefinition items={items} currentPage={currentPage}/>}
      />
      <Paginate pageCount={pageCount} paginateChangeHandler={paginateChangeHandler}/>
    </section>
  );
};

export default ListDefinition;
