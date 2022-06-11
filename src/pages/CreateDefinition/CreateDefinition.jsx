/* eslint-disable no-undef */
/* eslint-disable operator-linebreak */
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';
import API_ENDPOINT from '../../globals/apiEndpoint';
import '../../index.css';
import '../../styles/global.css';
import '../../styles/Form.css';

const FormCreateDefinition = ({ categories }) => {
  const navigate = useNavigate();
  const { sendRequest, status } = useRequest();
  const termInput = useRef();
  const definitionInput = useRef();
  const categoryInput = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const token = JSON.parse(localStorage.getItem('authentication'));

    const sendDataRequest = {
      term: termInput.current.value,
      definition: definitionInput.current.value,
      category_id: parseInt(categoryInput.current.value, Number),
    };

    await sendRequest({
      requestUrl: API_ENDPOINT.CREATE_DEFINITION,
      method: 'POST',
      data: sendDataRequest,
      token: token.token,
    });
  };

  if (status === 'completed') {
    Swal.fire({
      icon: 'success',
      title: 'Definisi berhasil Ditambahkan',
      showConfirmButton: false,
      timer: 3000,
    });
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }

  return (
    <form className="col-12 col-md-8 col-lg-6" onSubmit={submitHandler}>
      <h1 className="form__title mb-5">Tambah Istilah Baru</h1>
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
            <option disabled className="text-secondary" value="DEFAULT">
              &mdash; Pilih Kategori &mdash;
            </option>
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
  const { sendRequest, data: categoryData } = useRequest();

  useEffect(() => {
    sendRequest({
      requestUrl: `${API_ENDPOINT.CATEGORY}`,
      method: 'GET',
    });
  }, [sendRequest]);
  return (
    <>
      <div className="container py-5">
        <div className="d-flex flex-column align-items-center justify-content-center my-5">
          <FormCreateDefinition categories={categoryData} />
        </div>
      </div>
    </>
  );
};

export default CreateDefinition;
