import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import './DashboardStatistics.scss';
import API_ENDPOINT from '../../globals/apiEndpoint';
import { Loading, EmptyMessage } from '../../components';

const DashboardStatistics = () => {
  const [data, setData] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { token, logout } = useAuth();
  
  const cardTitle = {
    0: 'Total Definisi yang Perlu Diperiksa',
    1: 'Total Definisi yang Telah Disetujui',
    2: 'Total Definisi yang Telah Ditolak',
    3: 'Total Definisi yang Telah Dihapus',
    4: 'Total User',
    5: 'Total Admin',
  };
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(API_ENDPOINT.DASHBOARD_STATISTICS, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        const statusErrorMessage = error.response.status;
        
        if (statusErrorMessage === 401) {
          return logout('Authorization gagal, mohon login ulang!');
        }
        
        setErrorMessage(error);
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  console.log(data);
  return (
    <section className="dashboard__statistics">
      <h1>Statistik</h1>
      {isloading && <Loading />}
      {errorMessage && <EmptyMessage message="Tidak ada data statistics mohon coba lagi nanti!" />}
      {
        data && !errorMessage && (
          <div className="row gx-5 gy-4">
            <div className="col-12 col-md-6 col-xl-4">
              <div className="dashboard__statistics__card statistics-1 p-4">
                <h2 className="dashboard__statistics__card__title">
                  {cardTitle[0]}
                </h2>
                <p className="dashboard__statistics__card__value">
                  {data.data.definition_review}
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-4">
              <div className="dashboard__statistics__card statistics-2 p-4">
                <h2 className="dashboard__statistics__card__title">
                  {cardTitle[1]}
                </h2>
                <p className="dashboard__statistics__card__value">
                  {data.data.definition_approved}
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-4">
              <div className="dashboard__statistics__card statistics-3 p-4">
                <h2 className="dashboard__statistics__card__title">
                  {cardTitle[2]}
                </h2>
                <p className="dashboard__statistics__card__value">
                  {data.data.definition_rejected}
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-4">
              <div className="dashboard__statistics__card statistics-4 p-4">
                <h2 className="dashboard__statistics__card__title">
                  {cardTitle[3]}
                </h2>
                <p className="dashboard__statistics__card__value">
                  {data.data.definition_deleted}
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-4">
              <div className="dashboard__statistics__card statistics-5 p-4 bg-primary">
                <h2 className="dashboard__statistics__card__title">
                  {cardTitle[4]}
                </h2>
                <p className="dashboard__statistics__card__value">
                  {data.data.users}
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xl-4">
              <div className="dashboard__statistics__card statistics-6 p-4 bg-info">
                <h2 className="dashboard__statistics__card__title">
                  {cardTitle[5]}
                </h2>
                <p className="dashboard__statistics__card__value">
                  {data.data.admin}
                </p>
              </div>
            </div>
          </div>
        )
      }
    </section>
  );
};

export default DashboardStatistics;
