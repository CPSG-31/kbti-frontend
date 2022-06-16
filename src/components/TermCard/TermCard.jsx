import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TermCard.css';
import {
  UpvoteSvg, DownvoteSvg, FlagSvg, ShareSvg,
} from '../../icons';
import useAuth from '../../hooks/useAuth';
import API_ENDPOINT from '../../globals/apiEndpoint';

const TermCard = ({ index, dataDefinition }) => {
  const { id, term, category, definition, down_votes: downVotes, up_votes: upVotes, username, updated_at: updatedAt } = dataDefinition;
  const [totalVotes, setTotalVotes] = useState(upVotes - downVotes);
  const [isVoted, setIsVoted] = useState({ upVotes: false, downVotes: false });
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

    const voteStatus = (isUpvote) ? { upVotes: true, downVotes: false } : { upVotes: false, downVotes: true };
    setIsVoted(voteStatus);

    const { data: vote } = await voteDefinition(isUpvote);
    setTotalVotes(vote.up_votes - vote.down_votes);
  };

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="vote__container col-2 text-center py-1">
          <div className="vote__inner">
            <button type="button" className="btn pb-0" disabled={isVoted.upVotes} onClick={voteHandler.bind(null, true)}>
              <UpvoteSvg />
            </button>
            <div className="vote__count fs-6 lh-2">{totalVotes}</div>
            <button type="button" className="btn pt-0" disabled={isVoted.downVotes} onClick={voteHandler.bind(null, false)}>
              <DownvoteSvg />
            </button>
          </div>
        </div>
        <div className="col-10">
          <div className="card-body">
            <h2 className="card-title mb-0">{term}</h2>
            <div className="term__info">
              <a href="#" className="link-primary">
                {username}
              </a>
              <span className="mx-1 text-muted">&#8226;</span>
              <small className="text-muted">{updatedAt}</small>
            </div>
            <p className="card-text my-3">{definition}</p>
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
