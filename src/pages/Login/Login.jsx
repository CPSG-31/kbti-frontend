import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import API_ENDPOINT from '../../globals/apiEndpoint';
import '../../index.css';
import '../../styles/global.css';
import '../../styles/Form.css';

const Login = () => {
  const emailInput = useRef();
  const passwordInput = useRef();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const submitHandler = async (event) => {
    event.preventDefault();
    
    const sendDataRequest = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };
    
    try {
      const response = await axios.post(API_ENDPOINT.LOGIN, sendDataRequest);
      await Swal.fire({
        title: 'Berhasil Login',
        text: 'Berhasil login, silahkan menikmati fitur yang ada ya',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      login(response.data);
      navigate('/');
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      Swal.fire({
        title: 'Gagal Login',
        text: `${errorMessage}`,
        icon: 'error',
      });
    }
  };
  
  return (
    <>
      <div className="container py-5">
        <div className="d-flex flex-column align-items-center justify-content-center my-5">
          <form className="col-10 col-md-6 col-lg-4 py-4" onSubmit={submitHandler}>
            <h1 className="form__title mb-5">Masuk</h1>
            <div className="row mb-3">
              <label htmlFor="emailInput" className="form-label">
                Email
                <input ref={emailInput} type="email" name="email" id="emailInput" className="form-control form__input mt-1" placeholder="Email Anda" required />
              </label>
            </div>
            <div className="row mb-3">
              <label htmlFor="passwordInput" className="form-label">
                Password
                <input ref={passwordInput} type="password" name="password" id="passwordInput" className="form-control form__input mt-1" placeholder="Masukkan Password" minLength={8} required />
                <div id="passwordHelp" className="form-text">
                  Panjang password minimal 8 karakter.
                </div>
              </label>
            </div>
            <div className="row mb-3 mt-4">
              <input type="submit" className="mx-auto btn btn-kbti rounded-pill" value="Masuk" />
              <p className="text-center mt-3">
                Belum punya akun?
                {' '}
                <Link to="/register" className="kbti-link pl-2">Daftar</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
