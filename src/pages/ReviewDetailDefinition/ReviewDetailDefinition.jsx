import { useNavigate, useParams } from 'react-router-dom';
import './ReviewDetailDefinition.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import API_ENDPOINT from '../../globals/apiEndpoint';
import useAuth from '../../hooks/useAuth';
import {
  Loading,
  EmptyMessage,
} from '../../components';

const ReviewDetailDefinition = () => {
  const { idDefinition } = useParams();
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const reviewDefinitionHandler = async (status) => {
    const sendBodyRequest = {
      status_definition_id: status ? 2 : 3,
    };
    
    try {
      const isSuccessMessage = status ? 'Berhasil menyetujui definisi' : 'Berhasil menolak definisi';
      
      await axios.put(API_ENDPOINT.ADMIN_ACTION_DEFINITION_REVIEW(idDefinition), sendBodyRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      await Swal.fire({
        title: 'Berhasil!',
        text: isSuccessMessage,
        icon: 'success',
        timer: 2000,
      });
      navigate('/dashboard/definitions/review');
    } catch (error) {
      const statusErrorMessage = error.response.status;
  
      if (statusErrorMessage === 401) {
        return logout('Authorization gagal, mohon login ulang!');
      } else {
        await Swal.fire({
          title: 'Gagal',
          text: 'Gagal melakukan review definisi',
          icon: 'error',
          timer: 2000,
        });
      }
    }
  };
  
  const submitHandler = async (event) => {
    event.preventDefault();
    const { id } = event.nativeEvent.submitter;
    const status = id === 'approve-update-review';
    await reviewDefinitionHandler(status);
  };
  
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(API_ENDPOINT.ADMIN_DETAIL_DEFINITION_REVIEW(idDefinition), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        const statusErrorMessage = error.response.status;
  
        if (statusErrorMessage === 401) {
          return logout('Authorization gagal, mohon login ulang!');
        } else if (statusErrorMessage === 500) {
          setIsLoading(false);
          return setErrorMessage('Terjadi kesalahan pada server!');
        }
  
        setIsLoading(false);
        setErrorMessage('Terjadi kesalahan saat mengambil data!');
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <section className="form-admin">
      <h1 className="text-center">Tinjau Definisi Baru</h1>
      {isLoading && <Loading />}
      {errorMessage && <EmptyMessage message="Definisi Tidak ditemukan" />}
      {data && !errorMessage && (
        <form className="form-admin__container" onSubmit={submitHandler}>
          <div className="form-admin__group">
            <label htmlFor="term">Istilah</label>
            <input type="text" className="form-control text-muted" id="term" defaultValue={data.data.term} readOnly/>
          </div>
          <div className="form-admin__group">
            <label htmlFor="definition">Definisi</label>
            <textarea
              className="form-control text-muted"
              id="definition"
              defaultValue={data.data.definition}
              rows="9"
              readOnly
            />
          </div>
          <div className="form-admin__group">
            <label htmlFor="category">Kategori</label>
            <select className="form-control text-muted" id="category" readOnly>
              <option>{data.data.category}</option>
            </select>
          </div>
          <div className="form-admin__group">
            <button id="approve-update-review" className="btn form-admin__button-approve">Approve</button>
            <button id="reject-update-review" className="btn form-admin__button-reject">Reject</button>
          </div>
        </form>
      )}
    </section>
  );
};

export default ReviewDetailDefinition;
