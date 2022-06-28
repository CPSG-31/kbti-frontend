import { useContext } from 'react';
import { AuthContext } from '../store/authContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;
