import './TermPill.css';

const TermPill = ({ index, term }) => (
  <button key={index} type="button" className="term-pill btn btn-outline-primary rounded-pill mx-2 px-4 py-2">
    {term}
  </button>
);

export default TermPill;
