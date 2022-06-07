import './TermCard.css';
import {
 UpvoteSvg, DownvoteSvg, FlagSvg, ShareSvg, 
} from '../../icons';

const TermCard = ({ index, term }) => (
  <div className="card mb-3">
    <div className="row g-0">
      <div className="vote__container col-2 text-center py-1">
        <div className="vote__inner">
          <button type="button" className="btn pb-0">
            <UpvoteSvg />
          </button>
          <div className="vote__count fs-6 lh-2">100</div>
          <button type="button" className="btn pt-0">
            <DownvoteSvg />
          </button>
        </div>
      </div>
      <div className="col-10">
        <div className="card-body">
          <h2 className="card-title mb-0">Block Chain</h2>
          <div className="term__info">
            <a href="#" className="link-primary">
              Egi
            </a>
            <span className="mx-1 text-muted">&#8226;</span>
            <small className="text-muted">22 Mei 2022</small>
          </div>
          <p className="card-text my-3">Teknologi yang digunakan sebagai sistem penyimpanan atau bank data secara digital yang terhubung dengan kriptografi.</p>
          <div className="term__action d-flex justify-content-end mt-1">
            <button type="button" className="term__action-button btn">
              <FlagSvg />
            </button>
            <button type="button" className="term__action-button btn">
              <ShareSvg />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TermCard;
