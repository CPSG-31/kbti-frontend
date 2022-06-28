/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import './DashboardUser.css';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { UserTermCard, Loading } from '../../components';
import { PlusSvg, InfoSvg } from '../../icons';
import emptyListImg from '../../assets/images/empty-list.png';
import STATUS from '../../globals/const';
import API_ENDPOINT from '../../globals/apiEndpoint';

const DashboardUser = () => {
  const { isLoggedIn } = useAuth();
  const { token } = useAuth();
  const [termList, setTermList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(termList);
  const totalTerms = userData.total_approved + userData.total_reject + userData.total_review;

  const approvedTerms = userData.definitions && userData.definitions.filter(
    (userTerm) => userTerm.statusDefinition === STATUS.approved,
  );
  const pendingTerms = userData.definitions && userData.definitions.filter(
    (userTerm) => userTerm.statusDefinition === STATUS.pending,
  );
  const rejectedTerms = userData.definitions && userData.definitions.filter(
    (userTerm) => userTerm.statusDefinition === STATUS.rejected,
  );
  
  const showInfoHandler = () => {
    Swal.fire({
      title: 'Info',
      text: 'Setiap definisi dari istilah yang kamu buat akan direview oleh admin, setelah itu jika diterima maka istilahmu akan ditampilkan untuk publik',
      icon: 'info',
    });
  };

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(API_ENDPOINT.DASHBOARD, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });      

      setUserData(response.data.data);
      setTermList(response.data.data.definitions);
      setIsLoading(false);
    } catch (error) {
      const statusErrorMessage = error.response.status;
      const responseErrorMessage = error.response.data.message;
  
      if (statusErrorMessage === 401) {
        return logout('Authorization gagal, mohon login ulang!');
      }
      
      setIsLoading(false);
      setErrorMessage(responseErrorMessage);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, []);
  
  const handleDeteleButton = async (id) => {
    await Swal.fire({
      title: 'Apakah Anda Yakin?',
      text: 'Ingin menghapus definisi ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(API_ENDPOINT.DELETE_DEFINITION(id), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          Swal.fire({
            title: 'Berhasil!',
            text: 'Definisi berhasil dihapus!',
            icon: 'success',
            timer: 2000,
          });

          await fetchUserData();
        } catch (error) {
          const statusErrorMessage = error.response.status;
          const responseErrorMessage = error.response.data.message;
          
          if (statusErrorMessage === 401) {
            return logout('Authorization gagal, mohon login ulang!');
          } else {
            await Swal.fire({
              title: 'Error',
              text: responseErrorMessage,
              icon: 'error',
              timer: 2000,
            });
          }
        }
      }
    });
  };
  

  const termCardElements = (termData) => termData && termData.map((definition) => {
    return (
      <UserTermCard
        key={`${definition.id}UserTerms`}
        dataDefinition={definition}
        deleteButtonHandler={handleDeteleButton}
      />
    );
  });
  const emptyListState = (
    <div className="empty-list d-flex flex-column justify-content-center">
      <p className="empty-list-text text-center">
        Belum ada istilah yang kamu definisikan
      </p>
      <img
        className="empty-list-img mx-auto"
        src={emptyListImg}
        alt="empty user definition list"
      />
    </div>
  );

  return (
    <div className="dashboard-user">
      <div className="row md:gx-5">
        <div className="dashboard__aside-container col-12 col-lg-4 mt-4 mb-4">
          <div className="dashboard__user-action d-flex">
            <Link
              to={isLoggedIn ? '/definitions/create' : '/login'}
              className="add-term__button btn btn-kbti w-100 rounded-pill pt4 my-1 me-3 align-middle lh-lg"
              role="button"
            >
              <PlusSvg className="me-2" />
              <span className="btn-text">Tambah istilah baru</span>
            </Link>
          </div>
          <div
            className="dashboard__user-info mt-3 card w-100"
            style={{ width: '18rem' }}
          >         
          
          {isLoading && userData ? <Loading />
          
          : (             
            <div className="card-body">
            <div className="user-info__container d-flex justify-content-between align-items-center">
              <h2 className="card-title mt-3">
                Halo,
                {' '}
                {userData.username}
              </h2>              
              <button type="button" className="info-btn p-0 m-0 rounded-circle" onClick={showInfoHandler}>
                <InfoSvg className="info-btn__icon mt-0 pt-0" />
              </button>
            </div>
              <h6 className="card-subtitle mt-5 text-muted">
                status definisi yang kamu buat
              </h6>
              <div className="status-container mt-2 container">
                <div className="row px-3">
                  <button
                    type="button"
                    onClick={() => setTermList(approvedTerms)}
                    className="btn btn-link col-4 m-0 p-0 d-flex flex-column"
                  >
                    <span className="status-count text-center w-100">
                      {userData.total_approved}
                    </span>
                    <span className="status-text text-center w-100">
                      disetujui
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTermList(pendingTerms)}
                    className="btn btn-link col-4 m-0 p-0 d-flex flex-column"
                  >
                    <span className="status-count text-center w-100">
                      {userData.total_review}
                    </span>
                    <span className="status-text text-center w-100">
                      direview
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTermList(rejectedTerms)}
                    className="btn btn-link col-4 m-0 p-0 d-flex flex-column"
                  >
                    <span className="status-count text-center w-100">
                      {userData.total_reject}
                    </span>
                    <span className="status-text text-center w-100">
                      ditolak
                    </span>
                  </button>
                </div>
              </div>
            </div>
)}      
          </div>
        </div>
                         
        <div className="dashboard__terms-container col-12 col-lg-8 mt-4">
        {isLoading && userData && <Loading />} 
          {termList.length !== totalTerms
            ? (
              isLoading ? '' 
              : (
                <div
                  className="dashboard__terms-header d-flex justify-content-end"
                >
                <button
                  type="button"
                  onClick={() => setTermList(userData.definitions)}
                  className="btn btn-link mb-4"
                >
                  Lihat semua
                </button>
                </div>
              )
            ) : ''}     


            {termCardElements(termList).length > 0
              ? termCardElements(termList)
              : (isLoading ? '' : emptyListState)}
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
