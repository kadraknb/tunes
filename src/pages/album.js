import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

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
  }

  fechGetinfoAlbums = async () => {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    console.log(album);
    this.setState({
      infoAlbum: album[0],
      album,
      artistName: album[0].artistName,
    });
  }

  render() {
    const { infoAlbum, artistName, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ infoAlbum.collectionName }</p>
        <MusicCard musicas={ album.slice(1) } />
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
