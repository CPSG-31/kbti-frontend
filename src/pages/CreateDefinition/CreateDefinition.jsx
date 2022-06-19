/* eslint-disable no-undef */
/* eslint-disable operator-linebreak */
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useRequest from '../../hooks/useRequest';
import API_ENDPOINT from '../../globals/apiEndpoint';
import '../../index.css';
import '../../styles/global.css';
import '../../styles/Form.css';
import useAuth from '../../hooks/useAuth';

const FormCreateDefinition = ({ categories, loading, error }) => {
  const navigate = useNavigate();
  const { sendRequest, status } = useRequest();
  const termInput = useRef();
  const definitionInput = useRef();
  const categoryInput = useRef();
  const { token } = useAuth();

  const submitHandler = async (event) => {
    event.preventDefault();

    const sendDataRequest = {
      term: termInput.current.value,
      definition: definitionInput.current.value,
      category_id: parseInt(categoryInput.current.value, Number),
    };
    
    try {
      await axios.post(API_ENDPOINT.CREATE_DEFINITION, sendDataRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      await Swal.fire({
        title: 'Berhasil!',
        text: 'Definisi berhasil ditambahkan!',
        icon: 'success',
        timer: 2000,
      });
      navigate('/dashboard');
    } catch (errorResponse) {
      const statusErrorMessage = errorResponse.response.status;
      
      if (statusErrorMessage === 401) {
        return logout('Authorization gagal, mohon login ulang!');
      }
      
      Swal.fire({
        title: 'Gagal!',
        text: 'Terjadi kesalahan saat membuat definisi!',
        icon: 'error',
        showConfirmButton: true,
      });
    }
  };

  return (
    <form className="col-12 col-md-8 col-lg-6" onSubmit={submitHandler}>
      <h1 className="form__title mb-5">Tambah Istilah Baru</h1>
      {error && <ErrorMessage message="Ada kesalahan mohon coba beberapa saat lagi" />}
      <div className="row mb-3">
        <label htmlFor="termInput" className="form-label">
          Istilah
          <input ref={termInput} type="text" name="term" id="termInput" className="form-control form__input mt-1" placeholder="Tulis Istilah IT, cth: Library" required />
        </label>
      </div>
      <div className="row mb-3">
        <label htmlFor="definitionInput" className="form-label">
          Definisi
          <textarea ref={definitionInput} name="email" id="definitionInput" className="form-control form__input mt-1" rows={10} placeholder="Jelaskan definisi dari istilah tersebut" minLength={10} required />
        </label>
      </div>
      <div className="row mb-3">
        <label htmlFor="categoryInput" className="form-label">
          Kategori
          <select defaultValue="DEFAULT" className="form-control form__input mt-1" name="category" id="categoryInput" ref={categoryInput}>
            {loading ? <option value="DEFAULT">Loading...</option> : (
              <option disabled className="text-secondary" value="DEFAULT">
                &mdash; Pilih Kategori &mdash;
              </option>
            )}
            {categories &&
              categories.data?.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                );
              })}
          </select>
        </label>
      </div>
      <div className="row mb-3 mt-4">
        <input type="submit" className="mx-auto btn btn-kbti rounded-pill" value="Tambah Istilah" />
      </div>
    </form>
  );
};

const CreateDefinition = () => {
  const [categories, setCategories] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(API_ENDPOINT.CATEGORY);
        
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        const statusErrorMessage = error.response.message;
        
        if (statusErrorMessage === 401) {
          return logout('Authorization gagal, mohon login ulang!');
        }
        
        setIsLoading(false);
        setErrorMessage(statusErrorMessage);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <>
      <div className="container py-5">
        <div className="d-flex flex-column align-items-center justify-content-center my-5">
          <FormCreateDefinition categories={categories} loading={isLoading} error={errorMessage}/>
        </div>
      </div>
    </>
  );
};

export default CreateDefinition;
