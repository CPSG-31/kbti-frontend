import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchBar, TermPill } from '../../components';
import API_ENDPOINT from '../../globals/apiEndpoint';
import useRequest from '../../hooks/useRequest';

const BrowseResult = () => {
  let searchResult;
  const { sendRequest, status, data: browseData } = useRequest();
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get('q');

  useEffect(() => {
    const getSearchResult = async () => {
      await sendRequest({
        requestUrl: API_ENDPOINT.SEARCH(searchValue),
        method: 'GET',
      });
    };

    getSearchResult();
  }, [sendRequest]);

  if (status === 'completed') {
    searchResult = browseData.data.map((data) => {
      return <TermPill key={data.term} term={data.term} />;
    });
  }

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
        {searchResult}
      </div>
    </div>
  );
};

export default BrowseResult;
