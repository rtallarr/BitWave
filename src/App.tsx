import './App.css';

import Dashboard from './components/dashboard';
import SpotifyLogin from './components/spotify-login'

export default function App() {
	const hash = window.location.hash
	let token: string = window.localStorage.getItem('token') || "";

	//console.log("hash: ", hash)

	//if the route has a hash, get the token from the hash
	if (hash && token == "") {
		token = hash.substring(1).split('&').find(elem => elem.startsWith("access_token"))?.split('=')[1] || "";
	}

	//if the token is in the hash and there is no token in local storage, set the token
	if (token && !localStorage.getItem('token')) {
		localStorage.setItem('token', token)
	}

	return (
		<div className="App">
			<h1>Display your Spotify profile data</h1>
			{ token ? 
				<Dashboard token={token} />
			:
				<SpotifyLogin />
			}
		</div>
	);
}