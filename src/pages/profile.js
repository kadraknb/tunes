import React from 'react';
import { Link } from 'react-router-dom';

import Carregando from '../components/caregando';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import imgP from '../../../images/T_imgPerfil.png'


class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      loading: true,
      umaVez: true,
    };
  }

  componentDidMount() {
    const { umaVez } = this.state;
    if (umaVez) {
      this.pegarId();
    }
  }

  pegarId = async () => {
    const { user } = this.state;
    if (!user) {
      const user = await getUser();
      this.setState({ user, loading: false, umaVez: false });
    }
  };

  editarperfil = () => 'Editar perfil';

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div id="T_Box_P">
          {loading && <Carregando />}
          <h3>{user.name}</h3>
          <h3>{user.email}</h3>
          <img src={user.image || imgP} alt={user.name} />
          <h5>{user.description}</h5>
          <Link to="/profile/edit">
            <button className="T_box T_boderStyle" type="button">
              {this.editarperfil()}
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Profile;
