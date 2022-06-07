import '../../index.css';
import '../../styles/global.css';
import '../../styles/Form.css';

const Register = () => {
  return (
    <>
      <div className="container py-5">
        <div className="d-flex flex-column align-items-center justify-content-center my-5">
          <form className="col-10 col-md-6 col-lg-4 py-4">
            <h1 className="form__title mb-5">Daftar</h1>
            <div className="row mb-3">
              <label htmlFor="usernameInput" className="form-label">
                Username
                <input type="text" name="username" id="usernameInput" className="form-control form__input mt-1" placeholder="Username" required minLength={3} />
              </label>
            </div>
            <div className="row mb-3">
              <label htmlFor="emailInput" className="form-label">
                Email
                <input type="email" name="email" id="emailInput" className="form-control form__input mt-1" placeholder="Email Anda" required />
              </label>
            </div>
            <div className="row mb-3">
              <label htmlFor="passwordInput" className="form-label">
                Password
                <input type="password" name="password" id="passwordInput" className="form-control form__input mt-1" placeholder="Masukkan Password" minLength={8} required />
              </label>
            </div>
            <div className="row mb-3 mt-4">
              <input type="submit" className="mx-auto btn btn-kbti rounded-pill" value="Daftar" />
              <p className="text-center mt-3">
                Sudah punya akun?
                {' '}
                <a href="#" className="kbti-link pl-2">Masuk</a>
              </p>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default Register;