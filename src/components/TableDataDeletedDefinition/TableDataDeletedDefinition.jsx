import { DeleteIcon } from '../../assets/icons';
import './TableDataDeletedDefinition.scss';

const TableDataDeletedDefinition = ({ items, currentPage, onDeleteDefinition }) => {
  return (
    <>
      <thead>
      <tr>
        <th>No</th>
        <th>Istilah</th>
        <th>Definisi</th>
        <th>Penulis</th>
        <th>Tanggal Dihapus</th>
        <th>Aksi</th>
      </tr>
      </thead>
      <tbody>
      {
        items.data.map((definition, index) => {
          const { id, term, definition: detailDefinition, username, deleted_at } = definition;
      
          const rowIndex = currentPage === 1 ? index + 1 : ((currentPage - 1) * 10) + index + 1;
      
          return (
            <tr key={id} className="table__data">
              <td>{rowIndex}</td>
              <td className="text-start">{term}</td>
              <td className="table__data-description text-start">
                <p>{detailDefinition}</p>
              </td>
              <td className="table__data-author">{username}</td>
              <td className="table__data-date">
                <span>{deleted_at}</span>
              </td>
              <td className="table__data-action">
                <button className="btn table__data-action__delete" onClick={onDeleteDefinition.bind(null, id)}>
                  <DeleteIcon />
                  Hapus Permanent
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

export default TableDataDeletedDefinition;
