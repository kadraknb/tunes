import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/album';
import Favorites from './pages/favorites';
import Profile from './pages/profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      // id: '',
    };
  }

  // addId = (id) => {
  //   this.setState({ id });
  //   console.log(`${id}sss`);
  // }

  render() {
    // const { id } = this.state;
    return (
      <BrowserRouter>
        {/* { id && <Redirect to="/" /> } */}
        <Switch>
          <Route exact path="/" component={ Login } />
          {/* <Route exact path="/" render={ () => <Login addId={ this.addId } /> } /> */}
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />

          <Route path="/*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
