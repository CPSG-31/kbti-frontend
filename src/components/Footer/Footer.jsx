import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer-admin__container d-flex flex-column flex-sm-row justify-content-between align-items-center">
      <p>&copy; 2022 KBTI</p>
      <p>
        <Link to="/term-of-use">
          Term of Use
        </Link>
         &nbsp; - &nbsp;
        <Link to="/About Us">
          About Us
        </Link>
      </p>
    </div>
  );
};

export default Footer;
