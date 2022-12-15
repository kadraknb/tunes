import React from 'react'
import PropTypes from 'prop-types'

import Header from '../components/Header'
import MusicCard from '../components/MusicCard'
import getMusics from '../services/musicsAPI'
import Carregando from '../components/caregando'
import { addSong, removeSong } from '../services/favoriteSongsAPI'

class Album extends React.Component {
  constructor () {
    super()

    this.state = {
      // infoAlbum: {},
      artistName: '',
      album: [],
      loading: true
    }
  }

  componentDidMount () {
    this.fechGetinfoAlbums()
    this.favoriteSongs({}, false)
  }

  fechGetinfoAlbums = async () => {
    const id = window.location.pathname.slice(7)
    const album = await getMusics(id)
    this.setState({
      infoAlbum: album[0],
      album,
      artistName: album[0].artistName,
      loading: false
    })
  }

  favoriteSongs = (aa, e) => {
    this.setState({ loading: true }, async () => {
      const listen = e ? addSong : removeSong
      await listen(aa)
      this.setState({ loading: false })
    })
  }

  render () {
    const { artistName, album, loading } = this.state
    return (
      <>
        <Header />
        <div id='T_A'>
        <h1 className='T_album_nome'>{ artistName }</h1>
        { loading
          ? <Carregando />
          : (
          <MusicCard musicas={ album.slice(1) } funOnChange={ this.favoriteSongs } />
            ) }
        </div>
      </>
    )
  }
}

Album.propTypes = {
  id: PropTypes.number
}

export default Album