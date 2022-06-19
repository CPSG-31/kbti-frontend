/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
  isLoggedIn: false,
  token: '',
  role: '',
  login: () => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const authenticationData = JSON.parse(localStorage.getItem('authentication'));
  const [token, setToken] = useState(authenticationData?.token || '');
  const navigate = useNavigate();

  const loginHandler = (authenticationResponse) => {
    const response = {
      token: authenticationResponse?.data?.access_token?.token,
      role_id: authenticationResponse?.data?.role_id,
    };
    
    setToken(response.token);
    localStorage.setItem('authentication', JSON.stringify({
      token: response.token,
      role_id: response.role_id,
    }));
  };
  
  const logoutHandler = async (message = null) => {
    if (message) {
      await Swal.fire({
        title: 'Gagal',
        text: message,
        icon: 'error',
        timer: 2000,
      });
    } else {
      await Swal.fire({
        title: 'Logout',
        text: 'Kamu berhasil logout',
        icon: 'success',
        timer: 2000,
      });
    }
    setToken('');
    localStorage.removeItem('authentication');
    navigate('/');
  };
  
  const contextValue = {
    isLoggedIn: !!token,
    token,
    role_id: authenticationData?.role_id,
    login: loginHandler,
    logout: logoutHandler,
  };
  
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
