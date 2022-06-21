/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-duplicate-props */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TermPill, TermCard } from '../../components';
import './Home.css';
import { PlusSvg, SearchSvg } from '../../icons';
import useAuth from '../../hooks/useAuth';

function Home() {
  const { isLoggedIn } = useAuth();
  const [randomTerms, setRandomTerms] = useState([]);
  const [newTerms, setNewTerms] = useState([]);
    
  const fetchRandomTerms = async () => {
    const response = await axios.get('https://kbti-api.herokuapp.com/terms/random');
    return response.data;
  };
  
  useEffect(() => {
    const firstTimeFetchData = async () => {
      const response = await fetchRandomTerms();
      setRandomTerms(response.data);
    };
    
    firstTimeFetchData();
  }, []);

  const fetchNewTerms = async () => {
    const response = await axios.get('https://kbti-api.herokuapp.com/terms/new');
    return response.data;
  };
  
  useEffect(() => {
    const firstTimeFetchData = async () => {
      const response = await fetchNewTerms();
      setNewTerms(response.data);
    };
    
    firstTimeFetchData();
  }, []);


    const randomTermElements = randomTerms && randomTerms.map((definition) => {
      return <TermCard key={definition.id} dataDefinition={definition} />;
    });

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
            <p className="ms-1">Istilah yang baru ditambahkan</p>
            <div className="new-term__pils">
              {newTerms.map((newTerm, index) => {
                return <TermPill key={`${index}newTerms`} term={newTerm.term} />;
              })}
            </div>
            <Link
              to={isLoggedIn ? '/definitions/create' : '/login'}
              className="add-term__button btn btn-kbti w-100 rounded-pill pt4 my-1 me-3 align-middle lh-lg"
              role="button"
            >
              <PlusSvg className="me-2" />
              <span className="btn-text">Tambah istilah baru</span>
            </Link>
          </div>
          <div className="random-term___container col-12 col-lg-8 mt-4">
           {randomTermElements}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
