/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/button-has-type */
import './DashboardUser.css';
import { UserTermCard } from '../../components';
import { PlusSvg, InfoSvg } from '../../icons';

const DashboardUser = () => {
  return (
    <div className="dashboard-user">
      <div className="row gx-5 row-cols-2">
        <div className="dashboard__aside-container col-12 col-lg-4 mt-4 mb-4">
          <div className="dashboard__user-action d-flex">
            <a
              className="add-term__button btn btn-primary rounded-pill pt4 my-1 me-2 align-middle lh-lg"
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
                  <a href="#" className="card-link col-4 m-0 p-0 d-flex flex-column">
                    <span className="status-count text-center">10</span>
                    <span className="status-text text-center">disetujui</span>
                  </a>
                  <a href="#" className="card-link col-4 m-0 p-0 d-flex flex-column ">
                    <span className="status-count text-center">2</span>
                    <span className="status-text text-center">sedang ditinjau</span>
                  </a>
                  <a href="#" className="card-link col-4 m-0 p-0 d-flex flex-column">
                    <span className="status-count text-center">3</span>
                    <span className="status-text text-center">ditolak</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard__terms-container col-12 col-lg-8 mt-4">
          <UserTermCard
            status="pending"
            term="Blockchain"
            date="22 Mei 2022"
            shortDescription="Teknologi yang digunakan sebagai sistem penyimpanan atau bank data secara digital yang terhubung dengan kriptografi."
          />
          <UserTermCard
            status="approved"
            term="Blockchain"
            date="22 Mei 2022"
            shortDescription="Teknologi yang digunakan sebagai sistem penyimpanan atau bank data secara digital yang terhubung dengan kriptografi."
          />
          <UserTermCard
            status="rejected"
            term="Blockchain"
            date="22 Mei 2022"
            shortDescription="Teknologi yang digunakan sebagai sistem penyimpanan atau bank data secara digital yang terhubung dengan kriptografi."
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
