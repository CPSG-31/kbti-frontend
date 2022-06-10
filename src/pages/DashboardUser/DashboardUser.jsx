/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import './DashboardUser.css';
import { useState } from 'react';
import { UserTermCard } from '../../components';
import { PlusSvg, InfoSvg } from '../../icons';
import emptyListImg from '../../assets/images/empty-list.png';
import STATUS from '../../globals/const';

const DashboardUser = () => {
  const userTerms = [
    {
      status: 'pending',
      term: 'Blockchain',
      date: '22 Mei 2022',
      shortDescription:
        'Teknologi yang digunakan sebagai sistem penyimpanan atau bank data secara digital yang terhubung dengan kriptografi.',
    },
    {
      status: 'approved',
      term: 'Blockchain',
      date: '22 Mei 2022',
      shortDescription:
        'Teknologi yang digunakan sebagai sistem penyimpanan atau bank data secara digital yang terhubung dengan kriptografi.',
    },
    {
      status: 'rejected',
      term: 'Blockchain',
      date: '22 Mei 2022',
      shortDescription:
        'Teknologi yang digunakan sebagai sistem penyimpanan atau bank data secara digital yang terhubung dengan kriptografi.',
    },
    // <UserTermCard
    //   status="rejected"
    //   term="Blockchain"
    //   date="22 Mei 2022"
    //   shortDescription="Teknologi yang digunakan sebagai sistem penyimpanan atau bank data secara digital yang terhubung dengan kriptografi."
    // />,
  ];
  const [termList, setTermList] = useState(userTerms);

  const approvedTerms = userTerms.filter(
    (userTerm) => userTerm.status === STATUS.approved,
  );
  const pendingTerms = userTerms.filter(
    (userTerm) => userTerm.status === STATUS.pending,
  );
  const rejectedTerms = userTerms.filter(
    (userTerm) => userTerm.status === STATUS.rejected,
  );


  const createTermCardElements = (termData) => termData.map(({ status, term, date, shortDescription }) => (
    <UserTermCard
      status={status}
      term={term}
      date={date}
      shortDescription={shortDescription}
    />
  ));
  const TermCardElements = createTermCardElements(termList);

  const approvedButtonHandler = () => {
    setTermList(approvedTerms);
    createTermCardElements(approvedTerms);
  };

  const pendingButtonHandler = () => {
    setTermList(pendingTerms);
    createTermCardElements(pendingTerms);
  };

  const rejecteddButtonHandler = () => {
    setTermList(rejectedTerms);
    createTermCardElements(rejectedTerms);
  };

  const seeAllButtonHandler = () => {
    setTermList(userTerms);
    createTermCardElements(userTerms);
  };

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
            <a
              className="btn-kbti btn w-100 rounded-pill pt4 my-1 me-2 align-middle lh-lg"
              href="#"
              role="button"
            >
              <PlusSvg className="me-2" />
              <span className="btn-text">Tambah istilah baru</span>
            </a>
            <button type="button" className="info-btn p-0 m-0 rounded-circle">
              <InfoSvg className="info-btn__icon" />
            </button>
          </div>
          <div
            className="dashboard__user-info mt-3 card w-100"
            style={{ width: '18rem' }}
          >
            <div className="card-body">
              <h2 className="card-title">Halo, Egi</h2>
              <h6 className="card-subtitle mt-5 text-muted">
                status definisi yang kamu buat
              </h6>
              <div className="status-container mt-2 container">
                <div className="row px-3">
                  <button
                    type="button"
                    onClick={() => approvedButtonHandler()}
                    className="btn btn-link col-4 m-0 p-0 d-flex flex-column"
                  >
                    <span className="status-count text-center w-100">
                    {approvedTerms.length}
                    </span>
                    <span className="status-text text-center w-100">
                      disetujui
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => pendingButtonHandler()}
                    className="btn btn-link col-4 m-0 p-0 d-flex flex-column"
                  >
                    <span className="status-count text-center w-100">
                      {pendingTerms.length}
                    </span>
                    <span className="status-text text-center w-100">
                      sedang ditinjau
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => rejecteddButtonHandler()}
                    className="btn btn-link col-4 m-0 p-0 d-flex flex-column"
                  >
                    <span className="status-count text-center w-100">
                      {rejectedTerms.length}
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
          {termList.length !== userTerms.length 
            ? (
            <div
              className="dashboard__terms-header d-flex justify-content-end"
            >
              <button
                type="button" 
                onClick={() => seeAllButtonHandler()}
                className="btn btn-link mb-4"
              >
              Lihat semua
              </button>
            </div>
            ) : ''}
          {TermCardElements.length > 0
            ? TermCardElements
            : emptyListState}
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
