import formatDate from '../../utils/formatDate';
import truncate from '../../utils/truncate';
import { DeleteIcon } from '../../assets/icons';
import './TableDataDefinition.scss';

const TableDataDefinition = ({ items, currentPage, onDeleteDefinition }) => {
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
        items?.data?.map((definition, index) => {
          const { id, term, definition: detailDefinition, status, created_at: createdAt } = definition;
          
          const statusDefinition = status === 'Disetujui' ? 'bg-success' : 'bg-danger';
          const rowIndex = currentPage === 1 ? index + 1 : ((currentPage - 1) * 10) + index + 1;
          
          return (
            <tr key={id} className="table__data">
              <td>{rowIndex}</td>
              <td className="text-start">{term}</td>
              <td className="table__data-description text-start">
                <p>{truncate(detailDefinition, 90)}</p>
              </td>
              <td className="table__data-status">
                <span className={statusDefinition}>{status}</span>
              </td>
              <td className="table__data-date">
                <span>{formatDate(createdAt)}</span>
              </td>
              <td className="table__data-action">
                  <button className="btn table__data-action__delete-only" onClick={onDeleteDefinition.bind(null, id)}>
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
