import React from 'react';
import { Redirect } from 'react-router-dom';
import './pages.css'

import { createUser } from '../services/userAPI';

const N3 = 3;
class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      id: '',
      buttonOff: true,
      logado: false,
    };
  }

  salvarId = (e) => {
    const { value } = e.target;
    if (value.length >= N3) {
      this.setState({
        id: value,
        buttonOff: false,
      });
    }
  };

  submitF = async (e) => {
    e.preventDefault()
    const { id } = this.state;
    await createUser({ name: id });
    this.setState({ logado: true });
  };

  render() {
    const { buttonOff, logado } = this.state;
    return (
      <div id='T-login'>
        <form id='T-F_login' className='T_box'>
          <input
            id='L_F_input'
            className='T_placeh T_boderStyle_input'
            placeholder='digite seu nome aqui'
            type="text"
            onChange={ this.salvarId }
          />
          <button
            id='T_F_login_button'
            className='T_boderStyle'
            type="submit"
            disabled={ buttonOff }
            onClick={ (e) => this.submitF(e) }
            >
            Entrar
          </button>
        </form>
            {logado && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
