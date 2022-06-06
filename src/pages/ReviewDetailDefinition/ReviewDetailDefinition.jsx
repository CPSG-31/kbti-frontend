import { useParams } from 'react-router-dom';
import './ReviewDetailDefinition.scss';

const ReviewDetailDefinition = () => {
  const { idDefinition } = useParams();

  return (
    <section className="form-admin">
      <h1 className="text-center">Tinjau Definisi Baru</h1>
  
      <form className="form-admin__container">
        <div className="form-admin__group">
          <label htmlFor="term">Istilah</label>
          <input type="text" className="form-control" id="term" value="Istilah" readOnly/>
        </div>
        <div className="form-admin__group">
          <label htmlFor="definition">Definisi</label>
          <textarea
            className="form-control"
            id="definition"
            value="komputer adalah alat yang dipakai untuk mengolah data menurut prosedur yang telah dirumuskan. komputer adalah suatu perangkat keras yang sangat berkaitan dengan teknologi. komputer mampu membantu berbagai pekerjaan manusia. Kata komputer pada awalnya dipergunakan untuk menggambarkan orang yang perkerjaannya melakukan perhitungan aritmetika, dengan atau tanpa alat bantu, tetapi arti kata ini kemudian dipindahkan kepada mesin itu sendiri."
            rows="9"
            readOnly
          />
        </div>
        <div className="form-admin__group">
          <label htmlFor="category">Kategori</label>
          <select className="form-control" id="category" readOnly>
            <option>Jaringan</option>
          </select>
        </div>
        <div className="form-admin__group">
          <button className="btn form-admin__button-approve">Approve</button>
          <button className="btn form-admin__button-reject">Reject</button>
        </div>
      </form>
    </section>
  );
};

export default ReviewDetailDefinition;
