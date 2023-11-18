import React, { Component} from 'react'
//import { getArtist, getProfile } from '../api/spotify';
import { fetchProfile, getAccessToken, redirectToAuthCode, fetchArtist } from '../api/spotify';
import axios from 'axios';

//async function print() {
//	console.log(
//		'getartist',
//		await getArtist('12GqGscKJx3aE4t07u7eVZ?si=ySfGfe9cSzCpoDq-qMKSLA', 'BQCJe1g7KHE7ZCtvYtXFuSCSS3tgLR3KPspDrge2TxZirwjK1Se-z3-3yd0DDuG097xdOLWMB6kw4eiyoj9ib-3o0v-0OeSzPuG8ETvh4YOB9vG6on4')
//		);
//	console.log(
//		'getprofile',
//		await getProfile('BQCJe1g7KHE7ZCtvYtXFuSCSS3tgLR3KPspDrge2TxZirwjK1Se-z3-3yd0DDuG097xdOLWMB6kw4eiyoj9ib-3o0v-0OeSzPuG8ETvh4YOB9vG6on4', 'tomiroman')
//	);
//}

async function logIn(clientId: string, code: string) {
	let token: string = "";
	//code = "";
	if (!code) {
		redirectToAuthCode(clientId);
	} else {
		console.log("code: ", code)
		const token = await getAccessToken(clientId, code);
		console.log("token: ", token);
	}
	return token
}

//function log() {
//	const [token, setToken] = useState<string>("")
//
//	useEffect(() => {
//		const hash = window.location.hash
//		let token = window.localStorage.getItem('token')
//
//		if (!token && hash) {
//			token = hash.substring(1).split('&').find(elem => elem.startsWith("access_token"))?.split('=')[1] || ""
//			console.log("token: ", token)
//		}
//	}, [])
//}

export default class SpotifyLogin extends Component {
	AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	REDIRECT_URI = "http://localhost:3000"
	clientId = process.env.REACT_APP_CLIENT_ID || "";

	params = new URLSearchParams(window.location.search);
	code = this.params.get("code");

  	render() {
		//const token = logIn(this.clientId, this.code!);
		//console.log(token);
		//const profile = this.componentDidMount();
		//console.log(profile);
		//print();
		if(process.env.NODE_ENV == 'production') {
			this.REDIRECT_URI = "https://bit-wave.vercel.app";
		} 

		console.log("App is running in:", process.env.NODE_ENV)
		console.log("redirect_uri: ", this.REDIRECT_URI)

		const hash = window.location.hash
		let token: string = ""

		//if the route has a hash, get the token from the hash
		if (!hash) {
			console.log("no hash")
		} else {
			token = hash.substring(1).split('&').find(elem => elem.startsWith("access_token"))?.split('=')[1] || "";
		}

		if (!token) {
			console.log("no token")
		} else {
			localStorage.setItem('token', token)
			fetchProfile().then (res => {
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
		
		//console.log("hash", hash)
		//console.log("token", token)
		//fetchArtist().then (res => console.log("artist: ", res))

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