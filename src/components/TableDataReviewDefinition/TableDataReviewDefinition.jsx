import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { ReviewIcon } from '../../assets/icons';
import './TableDataReviewDefinition.scss';

const TableDataReviewDefinition = ({ items, currentPage }) => {
  return (
    <>
      <thead>
      <tr>
        <th>No</th>
        <th>Istilah</th>
        <th>Definisi</th>
        <th>Penulis</th>
        <th>Tanggal Dibuat</th>
        <th>Aksi</th>
      </tr>
      </thead>
      <tbody>
      {
        items.data.map((definition, index) => {
          const { id, term, definition: detailDefinition, username, created_at: createdAt } = definition;
  
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
                <span>{formatDate(createdAt)}</span>
              </td>
              <td className="table__data-action">
                  <Link to={`/dashboard/definitions/${id}/review`} className="btn table__data-action__review">
                    <ReviewIcon />
                    Review
                  </Link>
              </td>
            </tr>
          );
        })
      }
      </tbody>
    </>
  );
};

export default TableDataReviewDefinition;
