import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TermCard.css';
import { UpvoteSvg, DownvoteSvg, FlagSvg, ShareSvg } from '../../icons';
import useAuth from '../../hooks/useAuth';
import API_ENDPOINT from '../../globals/apiEndpoint';
import formatDate from '../../utils/formatDate';

const TermCard = ({ index, dataDefinition }) => {
  const {
    id,
    term,
    category,
    definition,
    down_votes: downVotes,
    up_votes: upVotes,
    username,
    updated_at: updatedAt,
  } = dataDefinition;
  const [voteStatus, setVoteStatus] = useState({ upVotes: false, downVotes: false });
  const [totalVotes, setTotalVotes] = useState(upVotes - downVotes);
  const { isLoggedIn, token } = useAuth();
  const navigate = useNavigate();

  const voteDefinition = async (isUpvote) => axios.post(API_ENDPOINT.VOTE_DEFINITION(id), { is_upvote: isUpvote }, {
    headers: {
      'Content-Type': 'application/json',
      ...(!!token) && {
        Authorization: `Bearer ${token}`,
      },
    },
  }).then((res) => res.data);


  const voteHandler = async (isUpvote) => {
    if (!isLoggedIn) {
      return navigate('/login');
    }

    const { data: vote } = await voteDefinition(isUpvote);

    if (vote.is_voted) {
      setVoteStatus((isUpvote) ? { upVotes: true, downVotes: false } : { upVotes: false, downVotes: true });
    } else {
      setVoteStatus({ upVotes: false, downVotes: false });
    }

    setTotalVotes(vote.up_votes - vote.down_votes);
  };

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="vote__container col-2 text-center py-1">
          <div className="vote__inner">
            <button
              type="button"
              className="btn pb-0"
              disabled={voteStatus.upVotes}
              onClick={voteHandler.bind(null, true)}
            >
              <UpvoteSvg />
            </button>
            <div className="vote__count fs-6 lh-2 fw-bolder">
              {totalVotes}
            </div>
            <button
              type="button"
              className="btn pt-0"
              disabled={voteStatus.downVotes}
              onClick={voteHandler.bind(null, false)}
            >
              <DownvoteSvg />
            </button>
          </div>
        </div>
        <div className="col-10">
          <div className="card-body">
            <div className="term__category rounded d-inline-block p-1">
              <p className="term___category-text m-0">{category}</p>
            </div>
            <h2 className="card-title mb-0 lh-1">
              <a className="card-link" href={`/definitions?term=${term}`}>{term}</a>
            </h2>
            <div className="term__info mb-2">
              <span className="term__username">
                {username}
              </span>
              <span className="mx-1 text-muted">&#8226;</span>
              <small className="text-muted">{formatDate(updatedAt)}</small>
            </div>
            <p className="card-text mb-3">{definition}</p>
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
};

export default TermCard;
