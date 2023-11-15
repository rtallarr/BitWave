import React, { Component } from 'react';
import './App.css';

import Sidebar from './components/sidebar'
import Introduction from './components/introduction'
import SpotifyLogin from './components/spotify-login'

class App extends Component {
  render() {
    console.log("running app in", process.env.NODE_ENV)
    return (
      <div className="App">
        <SpotifyLogin />
      </div>
    );
  }
}

export default App;