import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/caregando';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.pegarId();
  }

  pegarId = () => {
    this.setState({ loading: true }, async () => {
      const user = await getUser();
      this.setState({ user, loading: false });
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Carregando /> : (
          <>
            <h3>{ user.name }</h3>
            <h3>{ user.email }</h3>
            <img src={ user.image } data-testid="profile-image" alt={ user.name } />
            <h5>{ user.description }</h5>
            <Link to="/profile/edit">
              <button type="button">Editar perfil</button>
            </Link>
          </>
        ) }
      </div>
    );
  }
}

export default Profile;
