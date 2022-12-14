import React from 'react';
import Propstypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './caregando';
import './components.css';
import icons from '../images/iconT';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      favoritos: [],
      playAtual: 0,
      onPlay: false,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite = () => {
    const { musicas } = this.props;
    this.setState({ loading: true }, async () => {
      const addFavori = await getFavoriteSongs();
      const favoritos = musicas.map((bb) =>
        addFavori.some((cc) => cc.trackId === bb.trackId)
      );
      this.setState({ favoritos, loading: false });
    });
  };

  play = (ii) => {
    const audio = document.getElementById('T_audio');
    this.setState({ onPlay: true, playAtual: ii }, () => audio.play());
  };

  pause = () => {
    const audio = document.getElementById('T_audio');
    this.setState({ onPlay: false }, () => audio.pause());
  };

  render() {
    const { loading, favoritos, playAtual, onPlay } = this.state;
    const { musicas, funOnChange } = this.props;
    console.log(musicas);
    return (
      <>
        {loading ? (
          <Carregando />
        ) : (
          <div id="T_box_all_play">
          <div id="T_box">
            <div id="espaco"></div>
            <div id="T_box_img">
              <img id="T_img_musi" src={musicas[playAtual].artworkUrl100} alt='tumble' />
            </div>
            <div id="T_play" className="">
              <div id="T_box_icon">
                <audio id="T_audio" src={musicas[playAtual].previewUrl} />
                <img
                  className="T_icon"
                  src={favoritos[playAtual] ? icons.removF : icons.addF}
                  onClick={() =>
                    funOnChange(musicas[playAtual], !favoritos[playAtual])
                  }
                  alt='icon favoritos'
                />
                <img
                  className="T_icon "
                  src={icons.prev}
                  onClick={() => {
                    this.setState({
                      playAtual: playAtual ? playAtual - 1 : 0,
                      onPlay: false,
                    });
                  }}
                  alt='icon prev'
                />
                <img
                  className="T_icon "
                  src={icons.next}
                  onClick={() => {
                    this.setState({ playAtual: playAtual + 1, onPlay: false });
                  }}
                  alt='icon next'
                />
                {onPlay ? (
                  <img
                    id="T_Icon_play"
                    src={icons.pause}
                    onClick={() => this.pause()}
                    alt='icon pause'
                  />
                ) : (
                  <img
                    id="T_Icon_play"
                    src={icons.play}
                    onClick={() => this.play(playAtual)}
                    alt='icon play'
                  />
                )}
                <input
                  defaultValue={100}
                  id="T_volume"
                  type={'range'}
                  onChange={(e) => {
                    document.getElementById('T_audio').volume =
                      e.target.value / 100;
                  }}
                />
                <p id="T_album_nome_id" className="T_album_nome">
                  {musicas[playAtual].trackName}
                </p>
                <p id="T_album_nome" className="T_album_nome">
                  {musicas[playAtual].collectionName}
                </p>
              </div>
            </div>
            <ul id="T_Box_allmusi">
              {musicas.map((aa, ii) => (
                <li id="T_LI_mucas" className="T_box " key={aa.trackId}>
                  <img
                    id="T_Icon_play2"
                    src={icons.play}
                    onClick={() => {
                      this.play(ii);
                    }}
                    alt='icon play'
                  />
                  <p>{aa.trackName}</p>
                  <img
                    className="T_icon "
                    src={favoritos[ii] ? icons.removF : icons.addF}
                    onClick={() => funOnChange(aa, !favoritos[ii])}
                    alt='icon favoritos'
                  />
                </li>
              ))}
            </ul>
          </div>
          </div>
        )}
      </>
    );
  }
}

MusicCard.propTypes = {
  musicas: Propstypes.arrayOf(Propstypes.object).isRequired,
  funOnChange: Propstypes.func.isRequired,
};

export default MusicCard;
