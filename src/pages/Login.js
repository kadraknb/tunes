import React from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from '../components/caregando';
import { createUser } from '../services/userAPI';

const N3 = 3;
class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      id: '',
      buttonOff: true,
      loading: false,
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

  submitF = async () => {
    const { id } = this.state;
    this.setState({ loading: true });
    await createUser({ name: id });
    this.setState({ logado: true, loading: false });
  };

  render() {
    const { buttonOff, loading, logado } = this.state;
    return (
      <div data-testid="page-login">
        { loading && <Carregando /> }
        {logado && <Redirect to="/search" />}
        <form>
          <input
            type="text"
            data-testid="login-name-input"
            onChange={ this.salvarId }
          />
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ buttonOff }
            onClick={ this.submitF }
          >
            Entrar
          </button>
        </form>

      </div>
    );
  }
}

export default Login;
