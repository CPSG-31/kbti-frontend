/* eslint-disable eqeqeq */
import './UserTermCard.css';
import {
 EditSvg, ThumbsUpSvg, ThumbsDownSvg, TrashSvg, 
} from '../../icons';
import STATUS from '../../globals/const';

const UserTermCard = ({
  id, statusDefinition, term, createdat, definition, upvote, downvote,
}) => {
  let statusElement = '';

  if (statusDefinition === STATUS.deleted) {
    return '';
  }

  if (statusDefinition == STATUS.pending) {
    statusElement = (
      <div className="term__status-pending rounded-pill">
        <p className="term___status-text">{STATUS.pending}</p>
      </div>
    );
  } else if (statusDefinition === STATUS.approved) {
    statusElement = (
      <>
        <div className="term__status-approved rounded-pill align-self-center">
          <p className="term___status-text">{STATUS.approved}</p>
        </div>
        <div className="term__vote-container d-flex">
          <div className="term__upvote-container">
            <div className="term__vote-inner d-flex ms-2 me-1 my-1">
              <ThumbsUpSvg className="align-self-center me-1" />
              <span className="term__vote-count">{upvote}</span>
            </div>
          </div>
          <div className="term__downvote-container">
            <div className="term__vote-inner d-flex ms-1 me-2 my-1">
              <ThumbsDownSvg className="align-self-center me-1" />
              <span className="term__vote-count">{downvote}</span>
            </div>
          </div>
        </div>
      </>
    );
  } else if (statusDefinition === STATUS.rejected) {
    statusElement = (
      <div className="term__status-rejected rounded-pill">
        <p className="term___status-text">{STATUS.rejected}</p>
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
          <small className="text-muted">{createdat}</small>
        </div>
        <p className="card-text mt-2 mb-0">{definition}</p>
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
