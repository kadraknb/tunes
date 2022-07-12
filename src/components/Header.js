import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from './caregando';

const { getUser } = require('../services/userAPI');

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      seila: true,
    };
  }

  componentDidMount() {
    // const { seila } = this.state;
    // if (seila) { this.nome(); }
    this.nome();
  }

  nome = async () => {
    const { name } = await getUser();
    this.setState({ name, seila: false });
  }

  render() {
    const { name, seila } = this.state;
    return (
      <header data-testid="header-component">
        {seila ? (
          <Carregando />
        ) : (
          <div>
            <p data-testid="header-user-name">{name}</p>
            <aside>
              <Link to="/search" data-testid="link-to-search">
                <p>search</p>
              </Link>
              <Link to="/favorites" data-testid="link-to-favorites">
                <p>favorites</p>
              </Link>
              <Link to="/profile" data-testid="link-to-profile">
                <p>profile</p>
              </Link>
            </aside>
          </div>
        )}
      </header>

    );
  }
}

export default Header;
