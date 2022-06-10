import '../../index.css';
import '../../styles/global.css';
import '../../styles/Form.css';
import { useParams } from 'react-router-dom';

const UpdateDefinition = () => {
  const { idDefinition } = useParams();

  return (
    <>
      <div className="container py-5">
        <div className="d-flex flex-column align-items-center justify-content-center my-5">
          <form className="col-12 col-md-8 col-lg-6">
            <h1 className="form__title mb-5">Edit Istilah</h1>
            <div className="row mb-3">
              <label htmlFor="termInput" className="form-label">
                Istilah
                <input type="text" name="username" id="termInput" className="form-control form__input mt-1" placeholder="Tulis Istilah IT, cth: Library" required minLength={3} />
              </label>
            </div>
            <div className="row mb-3">
              <label htmlFor="definitionInput" className="form-label">
                Definisi
                <textarea name="email" id="definitionInput" className="form-control form__input mt-1" rows={10} placeholder="Jelaskan definisi dari istilah tersebut" minLength={10} required />
              </label>
            </div>
            <div className="row mb-3">
              <label htmlFor="categoryInput" className="form-label">
                Kategori
                <select className="form-control form__input mt-1" name="category" id="categoryInput">
                  <option selected disabled className="text-secondary">&mdash; Pilih Kategori &mdash;</option>
                  <option value="1">Programming</option>
                  <option value="2">Networking</option>
                  <option value="3">Security</option>
                </select>
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