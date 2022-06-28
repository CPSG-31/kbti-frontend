import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer-admin__container d-flex flex-column flex-sm-row justify-content-between align-items-center">
      <p>&copy; 2022 KBTI</p>
      <p>
        <Link to="/about-us">
          Tentang Kami
        </Link>
      </p>
    </div>
  );
};

export default Footer;
