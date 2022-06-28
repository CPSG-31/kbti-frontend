import NotFoundImg from '../../assets/images/not-found-illustration.png';

function ErrorPage() {
  return (
    <div className="homepage h-100 d-flex justify-content-center">
      <div className="container__not-found align-middle my-auto">
        <img src={NotFoundImg} alt="page not found" />
        <p className="text-center text-dark fs-4 mt-2">Error page not found</p>
      </div>
    </div>
  );
}

export default ErrorPage;
