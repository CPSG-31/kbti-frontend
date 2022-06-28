/* eslint-disable no-unused-expressions */
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from './hooks/useAuth';

import { AdminLayout, PublicLayout } from './layouts';
import { Error } from './components';
import {
  Home,
  BrowseResult,
  CreateDefinition,
  ListDefinition,
  ListDeteledDefinition,
  ListUser,
  Login,
  Register,
  PublicListDefintion,
  ReviewDefinition,
  UpdateDefinition,
  DetailUser,
  ReviewDetailDefinition,
  DashboardUser,
  DefinitionDetail,
  AboutUs,
} from './pages';

import './styles/global.css';
import API_ENDPOINT from './globals/apiEndpoint';

const App = () => {
  const { role_id: roleId, isLoggedIn, login, logout } = useAuth();

  const [role, setRole] = useState(null);
  const [isNotValid, setIsNotValid] = useState(false);

  useEffect(() => {
    let tokenFromStorage;
    try {
      tokenFromStorage = JSON.parse(localStorage.getItem('authentication'));
    } catch (error) {
      tokenFromStorage = null;
    }
    setIsNotValid(false);
    if (tokenFromStorage !== null) {
      const checkToken = async () => {
        try {
          const response = await axios.get(API_ENDPOINT.CHECK_TOKEN, {
            headers: {
              Authorization: `Bearer ${tokenFromStorage.token}`,
            },
          });

          const tokenData = response.data;

          if (tokenData.data.expires_at < +Date.now()) {
            return logout('Sesi Berakhir, mohon login ulang!');
          }

          await login(tokenData);
          const roleIdResponse = tokenData.data.role_id;
          setRole(roleIdResponse === 1 ? 'admin' : roleIdResponse === 2 ? 'user' : 'guest');
        } catch (error) {
          const statusErrorMessage = error.response.status;
          if (statusErrorMessage === 401) {
            setIsNotValid(true);
            return logout('Authorization gagal, mohon login ulang!');
          }
        }
      };
      checkToken();
    } else {
      setRole('');
    }
  }, [roleId]);

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<BrowseResult />} />
        <Route path="definitions" element={<PublicListDefintion />} />
        <Route path="definition/detail/:idDefinition" element={<DefinitionDetail />} />
        <Route path="about-us" element={<AboutUs />} />
      </Route>

      {(!isLoggedIn || (role !== 'admin' && role !== 'user')) && (
        <Route element={<PublicLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      )}

      {isLoggedIn && (
        <Route element={<PublicLayout />}>
          <Route path="definitions/create" element={<CreateDefinition />} />
          <Route path="login" element={<Navigate to="/" />} />
          <Route path="register" element={<Navigate to="/" />} />
        </Route>
      )}

      {role === 'user' && isLoggedIn && (
        <Route element={<PublicLayout />}>
          <Route path="dashboard" element={<DashboardUser />} />
          <Route path="definitions/:idDefinition/edit" element={<UpdateDefinition />} />
        </Route>
      )}

      {role === 'admin' && isLoggedIn && (
        <>
          <Route path="dashboard" element={<AdminLayout />}>
            <Route path="definitions" element={<ListDefinition />} />
            <Route path="definitions/review" element={<ReviewDefinition />} />
            <Route path="definitions/:idDefinition/review" element={<ReviewDetailDefinition />} />
            <Route path="definitions/deleted" element={<ListDeteledDefinition />} />
            <Route path="users" element={<ListUser />} />
            <Route path="users/:idUser" element={<DetailUser />} />
          </Route>
        </>
      )}

      <Route element={!isLoggedIn || role || isNotValid ? <PublicLayout /> : ''}>
        <Route path="*" element={!isLoggedIn || role || isNotValid ? <Error /> : ''} />
      </Route>
    </Routes>
  );
};

export default App;
