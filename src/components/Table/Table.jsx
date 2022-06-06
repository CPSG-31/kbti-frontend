import './Table.scss';

const Table = ({ items, currentPage, totalItems, component }) => {
  const totalItemsInTable = currentPage === 1 ? currentPage + items.length - 1 : ((currentPage - 1) * 10) + items.length;
  
  return (
    <div className="table-responsive">
      <table className="table text-center">
        {component}
      </table>
  
      <p className="table__info-data">
        {
          `Menampilkan
          ${totalItemsInTable}
          dari ${totalItems} data`
        }
      </p>
    </div>
  );
};

export default Table;
