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
    setToken(authenticationResponse);
    localStorage.setItem('authentication', JSON.stringify({
      token: authenticationResponse?.token,
      role: authenticationResponse?.role,
    }));
  };
  
  const logoutHandler = () => {
    localStorage.removeItem('authentication');
  };
  
  const contextValue = {
    isLoggedIn: !!token,
    token,
    role: authenticationData?.role,
    Login: loginHandler,
    logout: logoutHandler,
  };
  
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
