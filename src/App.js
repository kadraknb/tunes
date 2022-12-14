import React, { useState } from 'react';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/album';
import Favorites from './pages/favorites';
import Profile from './pages/profile';
import ProfileEdit from './pages/ProfileEdit';
import './tuner.css';

function App() {
  const [router, setRouter] = useState('Login');
  const [album, setAlbum] = useState(0);

  const routers = {
    Login: <Login router={setRouter} />,
    Search: <Search router={setRouter} setAlbum={setAlbum} />,
    Album: <Album id={album} setRouter={setRouter} />,
    Favorites: <Favorites setRouter={setRouter} />,
    Profile: <Profile setRouter={setRouter} />,
    ProfileEdit: <ProfileEdit setRouter={setRouter} />,
  };
  return (
    <div id="tunerBody">
      <div id="mein_box">
        {routers[router]}
      </div>
    </div>
  );
}

export default App;
