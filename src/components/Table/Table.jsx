import './Table.scss';

const Table = ({ items, currentPage = 0, totalItems, component }) => {
  const totalItemsInTable = currentPage === 1 ? currentPage + items.data.length - 1 : ((currentPage - 1) * 10) + items.data.length;
  
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
