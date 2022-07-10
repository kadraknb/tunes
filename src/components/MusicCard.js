import React from 'react';
import Propstypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicas } = this.props;
    return (
      <ul>
        { musicas.map((aa) => (
          <li key={ aa.trackId }>
            { aa.trackName }
            <audio data-testid="audio-component" src={ aa.previewUrl } controls>
              <track kind="captions" />
            </audio>
          </li>
        )) }
      </ul>
    );
  }
}

MusicCard.propTypes = {
  musicas: Propstypes.arrayOf(Propstypes.object).isRequired,
};

export default MusicCard;
