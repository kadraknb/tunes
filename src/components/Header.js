import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from './caregando';
import { getUser } from '../services/userAPI';
import './components.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      seila: true,
    };
  }

  componentDidMount() {
    this.nome();
  }

  nome = async () => {
    const { name } = await getUser();
    this.setState({ name, seila: false });
  };

  render() {
    const { name, seila } = this.state;
    return (
      <header className="T_box" id="T_header">
        {seila ? (
          <Carregando />
        ) : (
          <div>
            <h2>{name}</h2>
            <aside>
              <Link to="/search">
                <button className="T_box T_boderStyle T_nav">search</button>
              </Link>
              <Link to="/favorites">
                <button className="T_box T_boderStyle T_nav">Favorites</button>
              </Link>
              <Link to="/profile">
                <button className="T_box T_boderStyle T_nav">Profile</button>
              </Link>
            </aside>
          </div>
        )}
      </header>
    );
  }
}

export default Header;
