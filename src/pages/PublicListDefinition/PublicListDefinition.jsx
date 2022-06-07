import { useParams } from 'react-router-dom';
import { TermCard } from '../../components';
import { PlusSvg } from '../../icons';

const PublicListDefinition = () => {
  const { term } = useParams();

  return (
    <div className="homepage">
      <form className="d-flex mt-2 mb-md-4">
        <input className="search-form form-control px-4 rounded-pill" type="search" placeholder="Cari istilah" aria-label="Search" />
      </form>

      <div className="row row-cols-2">
        <div className="col-12 col-lg-4 mt-5 mb-4">
          <a className="add-term__button btn btn-primary rounded-pill mt-1" href="#" role="button">
            <PlusSvg />
            Tambah istilah baru
          </a>
        </div>
        <div className="random-term___container col-12 col-lg-8 mt-4">
          <h3 className="my-4 fs-3 text-center">
            Definisi dari
            <span> &quot;Blockchain&quot;</span>
          </h3>

          <TermCard />
          <TermCard />
          <TermCard />
        </div>
      </div>
    </div>
  );
};

export default PublicListDefinition;
