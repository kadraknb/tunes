import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from '../components/caregando';

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
  };

  submit = async (aa) => {
    const { buscar } = this.state;
    aa.preventDefault();
    this.setState({ carregar: true });
    const artista = await searchAlbumsAPI(buscar);
    this.setState({
      artist: artista,
      nomeBusca: buscar,
      buscar: '',
      carregar: false,
    });
  };

  render() {
    const { buscar, buttonOff, artist, nomeBusca, carregar } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {carregar ? (
          <Carregando />
        ) : (
          <form id="T_F_search" className="T_box">
            <span className="seila ">
              <input
                className="T_boderStyle_input T_placeh"
                placeholder="nome do álbuns"
                type="text"
                onChange={(aa) => this.change(aa)}
                value={buscar}
              />
              <button
                className="T_boderStyle"
                id="T_S_butoon"
                type="submit"
                onClick={(aa) => this.submit(aa)}
                disabled={buttonOff}
              >
                Pesquisar
              </button>
            </span>
          </form>
        )}
        {artist[0] ? (
          <div id="T_sucado">
            <h3 id="T_S_H3_resel">
              Resultado da busca de: <strong>{nomeBusca}</strong>
            </h3>
            <ul>
              {artist.map((aa) => (
                <li key={aa.collectionId} id="T_S_li" className="T_box">
                  <Link to={`/album/${aa.collectionId}`}>
                    <img src={aa.artworkUrl100} className="T_IMG_album" />
                    <div id="T_S_LI_names">
                      <p className="T_album_nome">{aa.collectionName}</p>
                      <p className="T_nome_fino T_album_nome">
                        {aa.artistName}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          nomeBusca && <p>Nenhum álbum foi encontrado</p>
        )}
        Search
      </div>
    );
  }
}

export default Search;
