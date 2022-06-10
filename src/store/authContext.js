/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';

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
  
  const logoutHandler = () => {
    setToken('');
    localStorage.removeItem('authentication');
  };
  
  const contextValue = {
    isLoggedIn: !!token,
    token,
    role_id: authenticationData?.role,
    login: loginHandler,
    logout: logoutHandler,
  };
  
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
