import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from './caregando';

const { getUser } = require('../services/userAPI');

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
    };
  }

  componentDidMount() {
    this.nome();
  }

  nome = async () => {
    const nome = await getUser();
    // log(nome);
    // console.log(nome);
    this.setState({ nome: nome.name });
  }

  render() {
    const { nome } = this.state;
    // console.log(nome);
    return (
      <>
        <header data-testid="header-component">
          { !nome ? <Carregando />
            : <p data-testid="header-user-name">{ nome }</p>}
        </header>
        <aside>
          <Link to="/search" data-testid="link-to-search"><p>search</p></Link>
          <Link to="/favorites" data-testid="link-to-favorites"><p>favorites</p></Link>
          <Link to="/profile" data-testid="link-to-profile"><p>profile</p></Link>
        </aside>
      </>
    );
  }
}

export default Header;
