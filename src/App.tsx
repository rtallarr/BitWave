import React, { Component } from 'react';
import './App.css';

import SpotifyLogin from './components/spotify-login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SpotifyLogin />
      </div>
    );
  }
}

export default App;