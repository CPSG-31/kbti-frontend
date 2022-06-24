import { useNavigate, useParams } from 'react-router-dom';
import './UpdateRole.scss';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import API_ENDPOINT from '../../globals/apiEndpoint';
import {
  Loading,
  EmptyMessage,
} from '../../components';

const UpdateRole = () => {
  const { idUser } = useParams();
  const { token, logout } = useAuth();
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getRoleInput = useRef();
  const navigate = useNavigate();
  
  const updateRoleHandler = async () => {
    const sendBodyRequest = {
      role_id: +getRoleInput.current.value,
    };
    
    try {
      await axios.put(API_ENDPOINT.ADMIN_ACTION_UPDATE_USER(idUser), sendBodyRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      await Swal.fire({
        title: 'Berhasil!',
        text: 'Berhasil mengubah role user',
        icon: 'success',
        timer: 2000,
      });
      navigate('/dashboard/users');
    } catch (error) {
      const statusErrorMessage = error.response.status;
  
      if (statusErrorMessage === 401) {
        return logout('Authorization gagal, mohon login ulang!');
      } else {
        await Swal.fire({
          title: 'Error',
          text: 'Gagal mengubah role user',
          icon: 'error',
          timer: 2000,
        });
      }
    }
  };
  
  const submitHandler = async (event) => {
    event.preventDefault();
    
    await updateRoleHandler();
  };
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(API_ENDPOINT.ADMIN_DETAIL_USER(idUser), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        const statusErrorMessage = error.response.status;
        const responseErrorMessage = error.response.data.message;
  
        if (statusErrorMessage === 401) {
          return logout('Authorization gagal, mohon login ulang!');
        } else if (statusErrorMessage === 500) {
          setIsLoading(false);
          return setErrorMessage('Terjadi kesalahan pada server!');
        }
  
        setIsLoading(false);
        setErrorMessage(responseErrorMessage);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <section className="form-admin">
      <h1 className="text-center">Update Role</h1>
      {isLoading && <Loading />}
      {errorMessage && <EmptyMessage message="User tidak ditemukan" />}
      {data && !errorMessage && (
        <form className="form-admin__container" onSubmit={submitHandler}>
          <div className="form-admin__group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control text-muted" id="username" defaultValue={data.data.username} readOnly/>
          </div>
          <div className="form-admin__group">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control text-muted" id="email" defaultValue={data.data.email} readOnly/>
          </div>
          <div className="form-admin__group">
            <label htmlFor="role">Role</label>
            <select ref={getRoleInput} className="form-control" id="role" defaultValue={data.data.role_id}>
              <option value="1">Admin</option>
              <option value="2">User</option>
            </select>
          </div>
          <div className="form-admin__group">
            <button className="btn form-admin__button-save mx-auto d-block mt-5">Simpan</button>
          </div>
        </form>
      )}
    </section>
  );
};

export default UpdateRole;
