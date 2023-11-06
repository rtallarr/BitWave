import React, { Component } from 'react';
import './App.css';

import Sidebar from './components/sidebar'
import Introduction from './components/introduction'
import SpotifyLogin from './components/spotify-login'

class App extends Component {
  render() {
    return (
      <div id="colorlib-page">
        <div id="container-wrap">
		      <Sidebar></Sidebar>
		      <div id="colorlib-main">
		      	<Introduction></Introduction>
            <SpotifyLogin></SpotifyLogin>
          </div>
      	</div>
      </div>
    );
  }
}

export default App;