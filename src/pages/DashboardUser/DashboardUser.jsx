import './DashboardUser.css';
import { TermCard } from '../../components';
import { PlusSvg, InfoSvg } from '../../icons';

const DashboardUser = () => {
  return (
    <div className="dashboard-user">
        <div class="row row-cols-2">
          <div class="dashboard__aside-container col-12 col-lg-4 mt-4 mb-4">
            <div class="dashboard__user-action d-flex">
              <a
                className="add-term__button btn btn-primary rounded-pill mt-1 me-3"
                href="#"
                role="button"
              >
                <PlusSvg /> 
                Tambah istilah baru
              </a>
              <InfoSvg />
            </div>
            <div className="dashboard__user-info"></div>
          </div>
          <div class="dashboard__terms-container col-12 col-lg-8 mt-4">

          </div>
        </div>
    </div>
  );
};

export default DashboardUser;
