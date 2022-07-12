import React from 'react';
import Propstypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './caregando';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      favoritos: [],
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite = () => {
    const { musicas } = this.props;
    this.setState({ loading: true }, async () => {
      const addFavori = await getFavoriteSongs();
      const favoritos = musicas.map((bb) => (
        addFavori.some((cc) => cc.trackId === bb.trackId)));
      this.setState({ favoritos, loading: false });
    });
  }

  render() {
    const { loading, favoritos } = this.state;
    const { musicas, funOnChange } = this.props;
    return (
      <ul>
        {loading ? (
          <Carregando />
        ) : (
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
                  onChange={ (e) => {
                    const { checked } = e.target;
                    funOnChange(aa, checked);
                  } }
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
  funOnChange: Propstypes.func.isRequired,
};

export default MusicCard;
