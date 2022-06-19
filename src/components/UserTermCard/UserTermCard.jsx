/* eslint-disable react/destructuring-assignment */
import axios from 'axios';
import './UserTermCard.css';
import { Link } from 'react-router-dom';
import { EditSvg, ThumbsUpSvg, ThumbsDownSvg, TrashSvg } from '../../icons';
import STATUS from '../../globals/const';
import formatDate from '../../utils/formatDate';
import useAuth from '../../hooks/useAuth';

const UserTermCard = ({ dataDefinition, deleteButtonHandler }) => {
  let statusElement = '';
  const { token } = useAuth();
  const {
    id,
    term,
    category,
    statusDefinition,
    definition,
    down_votes: downvote,
    up_votes: upvote,
    updatedAt: date,
  } = dataDefinition;

  // const handleRemove = (termId) => {
  //   axios
  //     .delete(`https://kbti-api.herokuapp.com/definitions/${termId}`, { headers: {
  //       Authorization: `Bearer ${token}`,
  //     } });
  //     // .then((res) => {
  //     //   setTermList(userData.definitions);
  //     // });
  //     // .catch((err) => {
  //     //   console.log(err);
  //     // });
  // };

  // category, statusDefinition, term, updatedAt, definition, up_votes = null, down_votes = null
  if (statusDefinition === STATUS.deleted) {
    return '';
  }

  if (statusDefinition === STATUS.pending) {
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
          <div className="term__info mb-2">
            <p
              className="term__category d-inline-block mb-1 p-1 rounded"
            >
              {category}
            </p>
            <span className="mx-1 text-muted">&#8226;</span>
            <small className="text-muted">{formatDate(date)}</small>
          </div>
        </div>
        <p className="card-text mt-2 mb-0">{definition}</p>
        <a href="#" className="">
          Baca Selengkapnya
        </a>
        <div className="term__action d-flex justify-content-end mt-1">
          {/* eslint-disable-next-line react/void-dom-elements-no-children */}
          <Link to={`/definitions/${id}/edit`} className="term__action-button btn">
            <EditSvg />
          </Link>
          <button onClick={() => deleteButtonHandler(id)} type="button" className="term__action-button btn">
            <TrashSvg />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTermCard;
