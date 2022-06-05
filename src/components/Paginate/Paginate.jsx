import ReactPaginate from 'react-paginate';

const Paginate = ({pageCount, paginateChangeHandler}) => {
  return (
    <ReactPaginate
      previousLabel="<"
      nextLabel=">"
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={2}
      onPageChange={paginateChangeHandler}
      containerClassName="pagination justify-content-center"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      activeClassName="active"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      activeLinkClassName="active"
    />
  );
};

export default Paginate;
