import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { SearchBar, TermCard, Loading, EmptyMessage } from '../../components';
import API_ENDPOINT from '../../globals/apiEndpoint';
import useAuth from '../../hooks/useAuth';
import './PublicListDefinition.css';

const PublicListDefinition = () => {
  const [searchParams] = useSearchParams();
  const { isLoggedIn, logout } = useAuth();
  const term = searchParams.get('term');
  const categoryId = searchParams.get('categoryId');
  const categoryName = searchParams.get('categoryName');
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getSearchResult = async () => {
      let apiEndPoint;
      
      if (term) {
        apiEndPoint = API_ENDPOINT.GET_DEFINITIONS_BY_TERM(term);
      } else if (categoryId) {
        apiEndPoint = API_ENDPOINT.GET_DEFINITIONS_BY_CATEGORY_ID(categoryId);
      } else {
        return setErrorMessage('Terjadi kesalahan');
      }
  
      setIsLoading(true);
      setErrorMessage(null);
      setData(null);
      try {
        const response = await axios.get(apiEndPoint, {
          headers: {
            Authorization: `Bearer ${isLoggedIn}`,
          },
        });
        
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        const errorMessageResponse = error.response.data.message;
        
        setIsLoading(false);
        setErrorMessage(errorMessageResponse);
      }
    };

    getSearchResult();
  }, [term, categoryId]);

  return (
    <div className="definitionList">
      <SearchBar />
        <div className="random-term___container">
          <h3 className="mt-5 mb-3">
            {term && 'Definisi dari'}
            {categoryId && 'Category dari'}
            <span>
              {' '}
              &quot;
              {term || categoryName}
              &quot;
            </span>
          </h3>
          {isLoading && <Loading />}
          {errorMessage && !data && <EmptyMessage message={`${errorMessage}, lakukan pencarian`} />}
          {data && (
            data.data.map((definition) => {
              return <TermCard key={definition.id} dataDefinition={definition} />;
            })
          )}
        </div>
    </div>
  );
};

export default PublicListDefinition;
