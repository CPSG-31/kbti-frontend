/* eslint-disable no-unused-expressions */
import { Routes, Route } from 'react-router-dom';
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
  ReviewDetailDefinition, DashboardUser,
} from './pages';

import './styles/global.css';

const App = () => {
  const { role, isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<BrowseResult />} />
        <Route path="definitions" element={<PublicListDefintion />}/>
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
          <Route path="dashboard" element={<AdminLayout />} >
            <Route path="definitions" element={<ListDefinition />}/>
            <Route path="definitions/review" element={<ReviewDefinition />}/>
            <Route path="definitions/:idDefinition/review" element={<ReviewDetailDefinition />}/>
            <Route path="definitions/deleted" element={<ListDeteledDefinition />}/>
            <Route path="users" element={<ListUser />}/>
            <Route path="users/:idUser" element={<DetailUser />}/>
          </Route>
        </>
      )}
    
      <Route element={<PublicLayout />}>
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App;
