import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonOff: true,
      buscar: '',
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

  submit = () => {
    console.log('sim');
  }

  render() {
    const { buscar, buttonOff } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <span>
            <input
              type="text"
              onChange={ (aa) => this.change(aa) }
              value={ buscar }
              data-testid="search-artist-input"
            />
            <button
              type="submit"
              onClick={ this.submit }
              disabled={ buttonOff }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </span>
        </form>
        Search
      </div>
    );
  }
}

export default Search;
