import React from 'react';
import PropTypes from 'prop-types'
import Carregando from './caregando';
import { getUser } from '../services/userAPI';
import './components.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      carregando: true,
    };
  }

  componentDidMount() {
    this.nome();
  }

  nome = async () => {
    const { name } = await getUser();
    this.setState({ name, carregando: false });
  };

  render() {
    const { name, carregando } = this.state;
    const { setRouter } = this.props
    return (
      <header className="T_box" id="T_header">
        {carregando
          ? (
          <Carregando />
            )
          : (
          <div>
            <h2>Olá {name}</h2>
            <aside id='T_box_nav'>
              <button className='T_box T_boderStyle T_nav' onClick={ () => setRouter('Search')}>search</button>
              <button className='T_box T_boderStyle T_nav' onClick={ () => setRouter('Favorites')}>Favorites</button>
              <button className='T_box T_boderStyle T_nav' onClick={ () => setRouter('Profile')}>Profile</button>
            </aside>
          </div>
            )}
      </header>
    );
  }
}

Header.propTypes = {
  setRouter: PropTypes.func.isRequired
}

export default Header;
