import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/album';
import Favorites from './pages/favorites';
import Profile from './pages/profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import './tuner.css';

class App extends React.Component {
  render() {
    return (
      <div id="tunerBody">
        <div id="mein_box">
          <BrowserRouter>
            <Switch>
              <Route path="/tunes/" component={Login} />
              <Route path="/tunes/search" component={Search} />
              <Route
                path="/tunes/album/:id"
                render={(props) => <Album {...props} />}
              />
              <Route path="/tunes/favorites" component={Favorites} />
              <Route path="/tunes/profile/edit" component={ProfileEdit} />
              <Route path="/tunes/profile" component={Profile} />
              <Route path="/tunes/*" component={NotFound} />

              {/* <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route path="/*" component={ NotFound } /> */}
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
