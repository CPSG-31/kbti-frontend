import zahra from '../../assets/images/profile/zahra.jpeg';
import rizky from '../../assets/images/profile/rizky.jpeg';
import asnafi from '../../assets/images/profile/asnafi.jpeg';
import egi from '../../assets/images/profile/egi.jpeg';
import { GithubIcon, LinkedinIcon } from '../../assets/icons';

import './AboutUs.scss';

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="about-us__description text-center">
        <h1>Tentang Kami</h1>
        <p>
          KBTI atau Kamus Besar Teknologi Informasi
          adalah website yang menyediakan istilah dan
          definisi dalam dunia Informasi Teknologi yang
          ditulis berdasarkan partisipasi pengguna
        </p>
      </div>
      <div className="container text-center">
        <h2>Tim Pengembang</h2>
        <div className="row gy-4 d-flex justify-content-center">
          <div className="col-12 col-md-6 col-xl-3">
            <div className="about-us__card">
              <img src={zahra} alt="Zahra profile"/>
              <h3>Zahra Aulia Rahmadianti</h3>
              <p>Universitas Brawijaya</p>
              <div className="about-us__card-social">
                <a rel="noreferrer" href="https://www.linkedin.com/in/zahraauliar/" target="_blank">
                  <LinkedinIcon />
                </a>
                <a rel="noreferrer" href="https://github.com/zahraaulia16" target="_blank">
                  <GithubIcon />
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <div className="about-us__card">
              <img src={rizky} alt="Rizky profile"/>
              <h3>Mochamad Rizky Cahya Diputra</h3>
              <p>Insitut Teknologi Garut</p>
              <div className="about-us__card-social">
                <a rel="noreferrer" href="https://www.linkedin.com/in/mochamad-rizky/" target="_blank">
                  <LinkedinIcon />
                </a>
                <a rel="noreferrer" href="https://github.com/Mochamad-Rizky" target="_blank">
                  <GithubIcon />
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <div className="about-us__card">
              <img src={asnafi} alt="Asnafi profile"/>
              <h3>Tryo Asnafi</h3>
              <p>Politeknik Negeri Bengkalis</p>
              <div className="about-us__card-social">
                <a rel="noreferrer" href="https://www.linkedin.com/in/tryoasnafi/" target="_blank">
                  <LinkedinIcon />
                </a>
                <a rel="noreferrer" href="https://github.com/tryoasnafi" target="_blank">
                  <GithubIcon />
                </a>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <div className="about-us__card">
              <img src={egi} alt="Egi profile"/>
              <h3>Sofyan Egi Lesmana</h3>
              <p>Universitas Pasundan</p>
              <div className="about-us__card-social">
                <a rel="noreferrer" href="https://www.linkedin.com/in/sofyanegi/" target="_blank">
                  <LinkedinIcon />
                </a>
                <a rel="noreferrer" href="https://github.com/sofyanegil" target="_blank">
                  <GithubIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
