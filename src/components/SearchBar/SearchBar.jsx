import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SearhBar = () => {
  const searchInput = useRef();
  const navigate = useNavigate();

  const submitHandler = () => navigate(`/search?q=${searchInput.current.value}`);

  return (
    <form className="d-flex mt-2 mb-md-4" onSubmit={submitHandler}>
      <input ref={searchInput} name="q" className="search-form form-control px-4 rounded-pill" type="search" placeholder="Cari istilah" aria-label="Search" />
    </form>
  );
};

export default SearhBar;