import { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SearchBar, TermCard } from '../../components';
import API_ENDPOINT from '../../globals/apiEndpoint';
import useRequest from '../../hooks/useRequest';
import { PlusSvg } from '../../icons';
import useAuth from '../../hooks/useAuth';
import './PublicListDefinition.css';

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
    <div className="definitionList">
      <SearchBar />
        <div className="random-term___container">
          <h3 className="mt-5 mb-3">
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
  );
};

export default PublicListDefinition;
