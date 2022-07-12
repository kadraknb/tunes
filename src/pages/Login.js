import React from 'react';
import { Redirect } from 'react-router-dom';
import Carregando from '../components/caregando';

const { createUser } = require('../services/userAPI');

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

  componentDidMount() {
    // this.setState({
    //   id: '',
    //   buttonOff: true,
    //   loading: false,
    //   logado: false,
    // });
  }

  componentWillUnmount() {
    // this.setState({ loading: false, logado: false });
  }

  buttonOf = (value) => {
    this.setState({ buttonOff: value.length < N3 });
  };

  salvarId = (e) => {
    const { value } = e.target;
    this.setState({ id: value }, this.buttonOf(value));
  };

  submitF = (id) => {
    // e.preventDefault();
    this.setState({ loading: true }, async () => {
      await createUser({ name: id });
      this.setState({ logado: true });
    });
  };

  render() {
    const { id, buttonOff, loading, logado } = this.state;
    return (
      <div data-testid="page-login">
        {logado && <Redirect to="/search" />}
        {loading ? (
          <Carregando />
        ) : (
          <form>
            <input
              type="text"
              onChange={ (e) => this.salvarId(e) }
              value={ id }
              data-testid="login-name-input"
            />
            <button
              type="submit"
              disabled={ buttonOff }
              onClick={ () => this.submitF(id) }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
