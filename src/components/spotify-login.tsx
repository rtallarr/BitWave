import React, { Component} from 'react'
import { fetchProfile, getAccessToken, redirectToAuthCode } from '../api/spotify';

export default class SpotifyLogin extends Component {
	AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	REDIRECT_URI = "http://localhost:3000"

	params = new URLSearchParams(window.location.search);
	code = this.params.get("code");

  	render() {

		if(process.env.NODE_ENV == 'production') {
			this.REDIRECT_URI = "https://bit-wave.vercel.app";
		} 

		const hash = window.location.hash
		let token: string = window.localStorage.getItem('token') || "";

		//if the route has a hash, get the token from the hash
		if (hash && token == "") {
			token = hash.substring(1).split('&').find(elem => elem.startsWith("access_token"))?.split('=')[1] || "";
		}

		if (token) {
			localStorage.setItem('token', token)
			fetchProfile(token).then (res => {
				console.log("profile: ", res)
				document.getElementById("displayName")!.innerHTML = res.display_name;
				document.getElementById("id")!.innerHTML = res.id;
				document.getElementById("email")!.innerHTML = res.email;
				document.getElementById("uri")!.innerHTML = res.uri;
				document.getElementById("uri")!.setAttribute("href", res.uri);
				document.getElementById("url")!.innerHTML = res.external_urls.spotify;
				document.getElementById("url")!.setAttribute("href", res.external_urls.spotify);
				document.getElementById("imgUrl")!.innerHTML = res.images[0].url;
				document.getElementById("avatar")!.innerHTML = `<img src="${res.images[0].url}" />`;
			});
		}

    	return (
      	<div>
			{/* <button onClick={() => logIn(this.clientId, this.code!)}>Log in</button> */}
        	<h1>Display your Spotify profile data</h1>
			{token ? 
            <section id="profile">
            	<h2>Logged in as <span id="displayName"></span></h2>
            	<span id="avatar"></span>
            	<ul>
            	    <li>User ID: <span id="id"></span></li>
            	    <li>Email: <span id="email"></span></li>
            	    <li>Spotify URI: <a id="uri" href="#"></a></li>
            	    <li>Link: <a id="url" href="#"></a></li>
            	    <li>Profile Image: <span id="imgUrl"></span></li>
					<li>Avatar: <span id='avatar'></span></li>
            	</ul>
            </section>
			:
			<a href={`${this.AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&response_type=token`}>
				Login to spotify
			</a>
			}
      	</div>
    	)
  	}
}