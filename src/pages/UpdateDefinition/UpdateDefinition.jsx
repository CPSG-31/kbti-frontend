import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import '../../index.css';
import '../../styles/global.css';
import '../../styles/Form.css';
import API_ENDPOINT from '../../globals/apiEndpoint';
import { Loading, EmptyMessage } from '../../components';

const UpdateDefinition = () => {
  const { idDefinition } = useParams();
  const { token, logout } = useAuth();
  const [dataDefinition, setDataDefinition] = useState(null);
  const [dataCategory, setDataCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getTermInput = useRef();
  const getDefinitionInput = useRef();
  const getCategoryInput = useRef();
  const navigate = useNavigate();

  const listOptionCategory = dataCategory && dataCategory.data.map((category) => {
    return (
      <option key={category.id} value={category.id}>{category.category}</option>
    );
  });

  const submitHandler = async (event) => {
    event.preventDefault();

    const sendBodyRequest = {
      term: getTermInput.current.value,
      definition: getDefinitionInput.current.value,
      category_id: +getCategoryInput.current.value,
    };

    try {
      await axios.put(API_ENDPOINT.UPDATE_DEFINITION(idDefinition), sendBodyRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await Swal.fire({
        title: 'Berhasil!',
        text: 'Berhasil mengubah definisi',
        icon: 'success',
        timer: 2000,
      });

      navigate('/dashboard', { replace: true });
    } catch (error) {
      const statusErrorMessage = error.response.status;

      if (statusErrorMessage === 401) {
        return logout('Authorization gagal, mohon login ulang!');
      } else if (statusErrorMessage === 403) {
        return Swal.fire({
          title: 'Gagal!',
          text: 'Anda tidak mempunyai akses untuk mengubah definisi ini',
          icon: 'error',
          timer: 2000,
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Gagal mengubah definisi, silahkan coba lagi',
          icon: 'error',
          timer: 2000,
        });
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const definitionResponse = axios.get(API_ENDPOINT.DEFINITION(idDefinition), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const categoryResponse = axios.get(API_ENDPOINT.CATEGORIES, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const getAllResponse = await axios.all([definitionResponse, categoryResponse]);
        const [definition, category] = getAllResponse;
        setDataDefinition(definition.data);
        setDataCategory(category.data);
        setIsLoading(false);
      } catch (error) {
        const statusErrorMessage = error.response.status;

        if (statusErrorMessage === 401) {
          return logout('Authorization gagal, mohon login ulang!');
        } else if (statusErrorMessage === 500) {
          setIsLoading(false);
          return setErrorMessage('Terjadi kesalahan pada server!');
        }
        
        setErrorMessage('Definisi tidak ditemukan!');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container py-5">
        <div className="d-flex flex-column align-items-center justify-content-center my-5">
          <h1 className="form__title mb-5">Edit Istilah</h1>
          {isLoading && <Loading />}
          {errorMessage && <p className="text-center fw-bold fs-3">{errorMessage}</p>}
          <form className="col-12 col-md-8 col-lg-6" onSubmit={submitHandler}>
            <div className="row mb-3">
              <label htmlFor="termInput" className="form-label">
                Istilah
                <input ref={getTermInput} defaultValue={dataDefinition && dataDefinition.data.term} type="text" name="username" id="termInput" className="form-control form__input mt-1" placeholder="Tulis Istilah IT, cth: Library" required minLength={3} />
              </label>
            </div>
            <div className="row mb-3">
              <label htmlFor="definitionInput" className="form-label">
                Definisi
                <textarea ref={getDefinitionInput} defaultValue={dataDefinition && dataDefinition.data.definition} name="email" id="definitionInput" className="form-control form__input mt-1" rows={10} placeholder="Jelaskan definisi dari istilah tersebut" minLength={10} required />
              </label>
            </div>
            <div className="row mb-3">
              <label htmlFor="categoryInput" className="form-label">
                Kategori
                {!dataCategory ? <p>Loading</p> : (
                  <select ref={getCategoryInput} defaultValue={dataDefinition && dataDefinition.data.category_id} className="form-control form__input mt-1" name="category" id="categoryInput">
                    {listOptionCategory}
                  </select>
                )}
              </label>
            </div>
            <div className="row mb-3 mt-4">
              <input type="submit" className="mx-auto btn btn-kbti rounded-pill" value="Simpan" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateDefinition;
