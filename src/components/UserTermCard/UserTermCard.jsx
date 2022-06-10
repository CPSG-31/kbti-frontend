/* eslint-disable eqeqeq */
import './UserTermCard.css';
import {
 EditSvg, ThumbsUpSvg, ThumbsDownSvg, TrashSvg, 
} from '../../icons';
import STATUS from '../../globals/const';

const UserTermCard = ({
 status, term, date, shortDescription, 
}) => {
  let statusElement = '';

  if (status === STATUS.deleted) {
    return '';
  }

  if (status == STATUS.pending) {
    statusElement = (
      <div className="term__status-pending rounded-pill">
        <p className="term___status-text">Sedang Ditinjau</p>
      </div>
    );
  } else if (status === STATUS.approved) {
    statusElement = (
      <>
        <div className="term__status-approved rounded-pill align-self-center">
          <p className="term___status-text">Disetujui</p>
        </div>
        <div className="term__vote-container d-flex">
          <div className="term__upvote-container">
            <div className="term__vote-inner d-flex ms-2 me-1">
              <ThumbsUpSvg className="align-self-center me-1" />
              <span className="term__vote-count">1004</span>
            </div>
          </div>
          <div className="term__downvote-container">
            <div className="term__vote-inner d-flex ms-1 me-2">
              <ThumbsDownSvg className="align-self-center me-1" />
              <span className="term__vote-count">20</span>
            </div>
          </div>
        </div>
      </>
    );
  } else if (status === STATUS.rejected) {
    statusElement = (
      <div className="term__status-rejected rounded-pill">
        <p className="term___status-text">Ditolak</p>
      </div>
    );
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="term__status-container d-flex justify-content-between">
          {statusElement}
        </div>
        <h2 className="card-title mb-0 mt-4">{term}</h2>
        <div className="term__info">
          <small className="text-muted">{date}</small>
        </div>
        <p className="card-text mt-2 mb-0">{shortDescription}</p>
        <a href="#" className="">
          Baca Selengkapnya
        </a>
        <div className="term__action d-flex justify-content-end mt-1">
          <button type="button" className="term__action-button btn">
            <EditSvg />
          </button>
          <button type="button" className="term__action-button btn">
            <TrashSvg />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTermCard;
