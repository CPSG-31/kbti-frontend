import './TermPill.css';
import { Link } from 'react-router-dom';

const TermPill = ({ index, term }) => (
  <Link to={`/definitions?term=${term}`} key={index} className="term-pill btn btn-outline-primary rounded-pill mx-2 px-4 py-2">{term}</Link>
);

export default TermPill;
