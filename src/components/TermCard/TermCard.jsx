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
    username: name,
    updated_at: updatedAt,
  } = dataDefinition;
  const [voteStatus, setVoteStatus] = useState({ upVotes: false, downVotes: false });
  const [totalVotes, setTotalVotes] = useState(upVotes - downVotes);
  const { isLoggedIn, token, username } = useAuth();
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

  const reportHandler = async () => {
    if (!isLoggedIn) {
      await Swal.fire({
        title: 'Login dulu!',
        text: 'Anda harus login untuk melaporkan definisi ini!',
        icon: 'warning',
        timer: 2000,
      });
      return navigate('/login');
    }

    const scriptUrl = 'https://script.google.com/macros/s/AKfycbz4KQQB8sNN0D0WA-5HHGlS9NpoJpI9ld5x2DAxlXc80BzljC_k5R7Y-UjnczMx0mE_/exec';

    Swal.fire({
      title: 'Form Laporan',
      html: `
      <form name="form-to-google-sheets">
        <input type="hidden" name="idDefinition" id="idDefinition" class="swal2-input text-muted" readonly value="${id}" placeholder="ID Definition">
        <input type="hidden" readonly value="${name}" id="NamaPembuat" name="NamaPembuat" class="swal2-input text-muted" placeholder="Nama Pembuat">
        <input type="hidden" readonly value="${username}" id="NamaPelapor" name="NamaPelapor" class="swal2-input text-muted" placeholder="Nama Pelapor">
        <div class="d-flex flex-column mt-2">
          <label>Nama Istilah</label>
          <input type="text" readonly value="${term}" id="NamaIstilah" name="NamaIstilah" class="swal2-input text-muted" placeholder="Nama Istilah">
        </div>
        <div class="d-flex flex-column mt-3">
          <label>Pesan Keluhan</label>
          <textarea type="text" id="PesanKeluhan" name="PesanKeluhan" class="swal2-input d-inline-block p-3" rows="4" style="font-size:1.1rem; min-height:12rem !important;" placeholder="Sampaikan laporanmu terkait definisi ini."></textarea>
        </div>
      </form>
  `,
      confirmButtonText: 'Lapor',
      focusConfirm: false,
      preConfirm: () => {
        const forms = document.forms['form-to-google-sheets'];

        axios.post(scriptUrl, new FormData(forms)).then((res) => {
          Swal.fire({
            title: 'Terima Kasih',
            text: 'Terima kasih atas laporan Anda',
            icon: 'success',
            confirmButtonText: 'OK',
          });
        }).catch(() => {
          Swal.fire({
            title: 'Gagal',
            text: 'Terjadi kesalahan saat mengirim laporan',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        });
      },
    });
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
              <a href="#" className="term__username">
                {name}
              </a>
              <span className="mx-1 text-muted">&#8226;</span>
              <small className="text-muted">{formatDate(updatedAt)}</small>
            </div>
            <p className="card-text mb-3">{definition}</p>
            <div className="term__action d-flex justify-content-end mt-1">
              <button type="button" className="term__action-button btn" onClick={reportHandler}>
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
