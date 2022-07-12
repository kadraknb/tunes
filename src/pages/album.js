import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Carregando from '../components/caregando';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      infoAlbum: {},
      artistName: '',
      album: [],
    };
  }

  componentDidMount() {
    this.fechGetinfoAlbums();
    this.favoriteSongs({}, false);
  }

  fechGetinfoAlbums = async () => {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    this.setState({
      infoAlbum: album[0],
      album,
      artistName: album[0].artistName,
      loading: true,
    });
  }

  favoriteSongs = (aa, e) => {
    this.setState({ loading: true }, async () => {
      const listen = e ? addSong : removeSong;
      await listen(aa);
      this.setState({ loading: false });
    });
  }

  render() {
    const { infoAlbum, artistName, album, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ infoAlbum.collectionName }</p>
        { loading ? <Carregando /> : (
          <MusicCard musicas={ album.slice(1) } funOnChange={ this.favoriteSongs } />
        ) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
