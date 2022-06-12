import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SearchBar, TermCard } from '../../components';
import API_ENDPOINT from '../../globals/apiEndpoint';
import useRequest from '../../hooks/useRequest';
import { PlusSvg } from '../../icons';
import useAuth from '../../hooks/useAuth';

const PublicListDefinition = () => {
  let searchResult;
  const [searchParams] = useSearchParams();
  const { isLoggedIn } = useAuth();
  const term = searchParams.get('term');
  const categoryId = searchParams.get('categoryId');
  const { sendRequest, status, data: resultData } = useRequest();

  useEffect(() => {
    const getSearchResult = async () => {
      if (term) {
        await sendRequest({
          requestUrl: API_ENDPOINT.GET_DEFINITIONS_BY_TERM(term),
          method: 'GET',
        });
      }
      if (categoryId) {
        await sendRequest({
          requestUrl: API_ENDPOINT.GET_DEFINITIONS_BY_CATEGORY_ID(categoryId),
          method: 'GET',
        });
      }
    };

    getSearchResult();
  }, [sendRequest]);

  if (status === 'completed') {
    searchResult = resultData.data.map((definition) => {
      return <TermCard key={definition.id} dataDefinition={definition} />;
    });
  }

  return (
    <div className="homepage">
      <SearchBar />

      <div className="row row-cols-2">
        <div className="col-12 col-lg-4 mt-5 mb-4">
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
          <h3 className="my-4 fs-3 text-center">
            Definisi dari
            <span>
              {' '}
              &quot;
              {term}
              &quot;
            </span>
          </h3>
          {searchResult}
        </div>
      </div>
    </div>
  );
};

export default PublicListDefinition;
