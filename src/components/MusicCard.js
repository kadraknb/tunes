import React from 'react';
import Propstypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from './caregando';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  favoriteSongs = async (aa) => {
    this.setState({ loading: true });
    await addSong(aa);
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { musicas } = this.props;
    return (
      <ul>
        { musicas.map((aa) => (
          <li key={ aa.trackId }>
            <p>{aa.trackName}</p>
            <audio data-testid="audio-component" src={ aa.previewUrl } controls>
              <track kind="captions" />
            </audio>
            <label
              onChange={ (bb) => console.log(bb) }
              htmlFor={ aa.collectionId }
              data-testid={ `checkbox-music-${aa.trackId}` }
            >
              Favorita
              <input
                id={ aa.collectionId }
                type="checkbox"
                onChange={ () => this.favoriteSongs(aa) }
              />
            </label>
          </li>
        ))}
        { loading && <Carregando /> }
      </ul>
    );
  }
}

MusicCard.propTypes = {
  musicas: Propstypes.arrayOf(Propstypes.object).isRequired,
};

export default MusicCard;
