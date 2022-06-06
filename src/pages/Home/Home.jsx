/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Outlet } from 'react-router-dom';
import { TermPill, TermCard } from '../../components';
import './Home.css';
import { PlusSvg, SearchSvg } from '../../icons';
// import { ReactComponent as PlusSvg } from '../../icons/plus.svg';

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
    <>
    <div className="homepage">
      <form className="d-flex mt-2 mb-md-4">
        <input
          className="search-form form-control px-4 rounded-pill"
          type="search"
          placeholder="Cari istilah"
          aria-label="Search"
        />
      </form>
      <div class="term___container">
        <div class="row row-cols-2">
          <div class="new-term__container col-12 col-lg-4 mt-4 mb-4">
            <p>Istilah yang baru ditambahkan</p>
            <div className="new-term__pils">
              {newTerms.map((newTerm, index) => {
                return <TermPill index={index} term={newTerm} />;
              })}
            </div>
            <a
              className="add-term__button btn btn-primary rounded-pill mt-1"
              href="#"
              role="button"
            >
              <PlusSvg />
              Tambah istilah baru
            </a>
          </div>          
          <div class="random-term___container col-12 col-lg-8 mt-4">            
            <TermCard />
            <TermCard />
            <TermCard />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
