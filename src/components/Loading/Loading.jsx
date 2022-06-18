import './Loading.scss';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center loading">
      <div className="spinner-grow text-center" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
