/* eslint-disable react/jsx-no-duplicate-props */
import { Outlet } from 'react-router-dom';
import { TermPill, TermCard } from '../../components';
import './Home.css';
import { PlusSvg, SearchSvg } from '../../icons';

function Home() {
  const newTerms = [
    'Blockchain',
    'Cloud Computing',
    'Machine Learning',
    'BaaS',
    'React',
    'Backend',
  ];

  return (
    <div className="homepage">
      <form className="d-flex mt-2 mb-md-4">
        <input
          className="search-form form-control px-4 rounded-pill"
          type="search"
          placeholder="Cari istilah"
          aria-label="Search"
        />
      </form>
      <div className="term___container">
        <div className="row gx-5 row-cols-2">
          <div className="new-term__container col-12 col-lg-4 mt-4 mb-4">
            <p>Istilah yang baru ditambahkan</p>
            <div className="new-term__pils">
              {newTerms.map((newTerm, index) => {
                return <TermPill index={index} term={newTerm} />;
              })}
            </div>
            <a
              className="add-term__button btn btn-primary rounded-pill pt4 my-1 me-3 align-middle lh-lg"
              href="#"
              role="button"
            >
              <PlusSvg className="me-2" />
              <span className="btn-text">Tambah istilah baru</span>
            </a>
          </div>
          <div className="random-term___container col-12 col-lg-8 mt-4">
            <TermCard />
            <TermCard />
            <TermCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
