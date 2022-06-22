import { Link } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '../../assets/icons';
import './TableDataUser.scss';

const TableDataUser = ({ items, currentPage, onDeleteUser }) => {
  return (
    <>
      <thead>
        <tr>
          <th>No</th>
          <th>UserName</th>
          <th>Role</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {
          items?.data?.map((user, index) => {
            const { id, username, role_name: roleName } = user;
      
            const rowIndex = currentPage === 1 ? index + 1 : ((currentPage - 1) * 10) + index + 1;
      
            return (
              <tr key={id} className="table__data">
                <td>{rowIndex}</td>
                <td>{username}</td>
                <td>{roleName}</td>
                <td className="table__data-action table__data-action-user">
                  <Link to={`/dashboard/users/${id}`}>
                    <EditIcon />
                  </Link>
                  <button className="btn" onClick={onDeleteUser.bind(null, id)}>
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

export default TableDataUser;
