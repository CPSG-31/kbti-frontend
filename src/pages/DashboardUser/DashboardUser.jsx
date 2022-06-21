/* eslint-disable camelcase */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import './DashboardUser.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { UserTermCard } from '../../components';
import { PlusSvg, InfoSvg } from '../../icons';
import emptyListImg from '../../assets/images/empty-list.png';
import STATUS from '../../globals/const';
import API_ENDPOINT from '../../globals/apiEndpoint';

const DashboardUser = () => {
  const { isLoggedIn } = useAuth();
  const { token } = useAuth();
  const [termList, setTermList] = useState([]);
  const [userData, setuserData] = useState(termList);
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

  const fetchUserData = async () => {
    const response = await axios.get(API_ENDPOINT.DASHBOARD, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  };

  const showInfoHandler = () => {
    Swal.fire({
      title: 'Info',
      text: 'Terdapat 3 kategori definisi yang dapat Anda pilih:',
      icon: 'info',
    });
  };


  useEffect(() => {
    const firstTimeFetchData = async () => {
      const response = await fetchUserData();
      setuserData(response.data);
      setTermList(response.data.definitions);
    };

    firstTimeFetchData();
  }, []);

  const handleDeteleButton = async (definitionId) => {
    const response = await axios.delete(API_ENDPOINT.DELETE_DEFINITION(definitionId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.reload();
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
      <div className="row gx-5 row-cols-2">
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
            <button type="button" className="info-btn p-0 m-0 rounded-circle" onClick={showInfoHandler}>
              <InfoSvg className="info-btn__icon" />
            </button>
          </div>
          <div
            className="dashboard__user-info mt-3 card w-100"
            style={{ width: '18rem' }}
          >
            <div className="card-body">
              <h2 className="card-title">
                Halo,
                {' '}
                {userData.username}
              </h2>
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
          </div>
        </div>
        <div className="dashboard__terms-container col-12 col-lg-8 mt-4">
          {termList.length !== totalTerms
            ? (
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
            ) : ''}
          {termCardElements(termList).length > 0
            ? termCardElements(termList)
            : emptyListState}
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
