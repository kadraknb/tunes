import React from 'react';
import Propstypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './caregando';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      addFavori: [],
    };
  }

  componentDidMount() {
    this.favoriteSongs();
  }

  getFavorite = async () => {
    const addFavori = await getFavoriteSongs();
    this.setState({ addFavori });
  }

  favoriteSongs = (aa) => {
    this.setState({ loading: true }, async () => {
      await addSong(aa);
      await this.getFavorite();
      this.setState({ loading: false });
    });
  }

  jaFavoritados = (aa) => {
    const { addFavori } = this.state;
    const favoritos = aa.map((bb) => (
      addFavori.some((cc) => cc.trackId === bb.trackId)));
    return favoritos;
  }

  render() {
    const { loading } = this.state;
    const { musicas } = this.props;
    const favoritos = this.jaFavoritados(musicas);
    return (
      <ul>
        { loading || !musicas[0] ? <Carregando /> : (
          musicas.map((aa, ii) => (
            <li key={ aa.trackId }>
              <p>{aa.trackName}</p>
              <audio data-testid="audio-component" src={ aa.previewUrl } controls>
                <track kind="captions" />
              </audio>
              <label
                htmlFor={ aa.collectionId }
                data-testid={ `checkbox-music-${aa.trackId}` }
              >
                Favorita
                <input
                  id={ aa.collectionId }
                  type="checkbox"
                  checked={ favoritos[ii] }
                  onChange={ () => this.favoriteSongs(aa) }
                />
              </label>
            </li>
          ))
        )}
      </ul>
    );
  }
}

MusicCard.propTypes = {
  musicas: Propstypes.arrayOf(Propstypes.object).isRequired,
};

export default MusicCard;
