import { useParams } from 'react-router-dom';
import './UpdateRole.scss';

const UpdateRole = () => {
  const { idUser } = useParams();

  return (
    <section className="form-admin">
      <h1 className="text-center">Update Role</h1>
      <form className="form-admin__container">
        <div className="form-admin__group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" value="Rizky Cahya" readOnly/>
        </div>
        <div className="form-admin__group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" value="Rizky@gmail.com" readOnly/>
        </div>
        <div className="form-admin__group">
          <label htmlFor="role">Role</label>
          <select className="form-control" id="role">
            <option>Admin</option>
            <option>User</option>
          </select>
        </div>
        <div className="form-admin__group">
          <button className="btn form-admin__button-save mx-auto d-block mt-5">Simpan</button>
        </div>
      </form>
    </section>
  );
};

export default UpdateRole;
