import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/caregando';

// const searchAlbumsAPI = require('../services/searchAlbumsAPI');

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonOff: true,
      buscar: '',
      nomeBusca: '',
      artist: [],
      carregar: false,
    };
  }

  // buttonOf = () => {
  // }

  change = (aa) => {
    const { value } = aa.target;
    this.setState({
      buscar: value,
      buttonOff: value.length < 2,
    });
  }

  submit = async (aa) => {
    const { buscar } = this.state;
    aa.preventDefault();
    this.setState({ carregar: true });
    const artista = await searchAlbumsAPI(buscar);
    // console.log(artista);
    this.setState({
      artist: artista,
      nomeBusca: buscar,
      buscar: '',
      carregar: false,
    });
  }

  render() {
    const { buscar, buttonOff, artist, nomeBusca, carregar } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          {carregar ? (
            <Carregando />
          ) : (
            <span>
              <input
                type="text"
                onChange={ (aa) => this.change(aa) }
                value={ buscar }
                data-testid="search-artist-input"
              />
              <button
                type="submit"
                onClick={ (aa) => this.submit(aa) }
                disabled={ buttonOff }
                data-testid="search-artist-button"
              >
                Pesquisar
              </button>
            </span>
          )}
        </form>
        {artist[0] ? (
          <>
            <span>
              {`Resultado de álbuns de: ${nomeBusca}`}
            </span>
            <ul>
              {artist.map((aa) => (
                <li key={ aa.collectionId }>
                  <Link
                    data-testid={ `link-to-album-${aa.collectionId}` }
                    to={ `/album/${aa.collectionId}` }
                  >
                    {aa.collectionName}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          nomeBusca && <p>Nenhum álbum foi encontrado</p>
        )}
        Search
      </div>
    );
  }
}

export default Search;
