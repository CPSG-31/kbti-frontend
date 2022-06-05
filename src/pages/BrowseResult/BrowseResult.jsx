import { TermPill } from '../../components';

const BrowseResult = () => {
  const searchResult = ['Blockhain', 'Backend', 'Background', 'BaaS', 'Bulk', 'Bulma'];
  return (
    <div className="homepage">
      <form className="d-flex mt-2 mb-md-4">
        <input className="search-form form-control px-4 rounded-pill" type="search" placeholder="Cari istilah" aria-label="Search" />
      </form>

      <h3 className="my-4 fs-4">
        Hasil pencarian dari
        <span> &quot;Block&quot;</span>
      </h3>

      <div className="new-term__pils mb-3 px-2 mx-auto ">
        {searchResult.map((term, index) => {
          return <TermPill key={term} term={term} />;
        })}
      </div>
    </div>
  );
};

export default BrowseResult;
