import { DeleteIcon } from '../../assets/icons';
import './TableDataDefinition.scss';

const TableDataDefinition = ({ items, currentPage }) => {
  return (
    <>
      <thead>
      <tr>
        <th>No</th>
        <th>Istilah</th>
        <th>Definisi</th>
        <th>Status</th>
        <th>Tanggal Dibuat</th>
        <th>Aksi</th>
      </tr>
      </thead>
      <tbody>
      {
        items.map((definition, index) => {
          const { id, term, definition: detailDefinition, status, date } = definition;
          
          const statusDefinition = status === 'Disetujui' ? 'bg-success' : 'bg-danger';
          const rowIndex = currentPage === 1 ? index + 1 : ((currentPage - 1) * 10) + index + 1;
          
          return (
            <tr key={id} className="table__data">
              <td>{rowIndex}</td>
              <td>{term}</td>
              <td className="table__data-description">
                <p>{detailDefinition}</p>
              </td>
              <td className="table__data-status">
                <span className={statusDefinition}>{status}</span>
              </td>
              <td className="table__data-date">{date}</td>
              <td className="table__data-action">
                  <button className="btn">
                    <DeleteIcon />
                  </button>
              </td>
            </tr>
          );
        })
      }
      </tbody>
    </>
  );
};

export default TableDataDefinition;
