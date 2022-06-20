import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { SearchBar, TermPill, EmptyMessage, Loading } from '../../components';
import API_ENDPOINT from '../../globals/apiEndpoint';

const BrowseResult = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchValue = searchParams.get('q');

  useEffect(() => {
    const getSearchResult = async () => {
      try {
        const response = await axios.get(API_ENDPOINT.SEARCH(searchValue));
        
        setData(response.data);
        setIsLoading(false);
        setErrorMessage(null);
      } catch (error) {
        const errorMessageResponse = error.response.data.message;
        setErrorMessage(errorMessageResponse);
        setData(null);
        setIsLoading(false);
      }
    };

    getSearchResult();
  }, [searchValue]);

  return (
    <div className="definitionList">
      <SearchBar />
      <h3 className="my-4 fs-4">
        Hasil pencarian dari
        <span>
          {' '}
          &quot;
          {searchValue}
          &quot;
        </span>
      </h3>
      <div className="new-term__pils mb-3 px-2 mx-auto">
        {isLoading && <Loading />}
        {errorMessage && !data && <EmptyMessage message={`${errorMessage}, lakukan pencarian`} />}
        {data && data.data.map((keyword) => {
          return <TermPill key={keyword.term} term={keyword.term} />;
        })}
      </div>
    </div>
  );
};

export default BrowseResult;
