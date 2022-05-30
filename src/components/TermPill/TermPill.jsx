import './TermPill.css';

const TermPill = ({ index, term }) => (
  <button key={index} type="button" className="term-pill btn btn-outline-primary rounded-pill">
    {term}
  </button>
);

export default TermPill;
