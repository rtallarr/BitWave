import React, { Component } from 'react'
//import { getArtist, getProfile } from '../api/spotify';
import { fetchProfile, getAccessToken, redirectToAuthCode } from '../api/spotify';

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
		console.log(token);
	}
	return token
}

export default class SpotifyLogin extends Component {
	clientId = process.env.REACT_APP_CLIENT_ID || "";
	params = new URLSearchParams(window.location.search);
	code = this.params.get("code");

	async componentDidMount() {
		const profile = await fetchProfile(this.code!);
		console.log(profile);

		return profile;
	}

  	render() {
		const token = logIn(this.clientId, this.code!);
		console.log(token);
		const profile = this.componentDidMount();
		console.log(profile);
		//print();
    	return (
      	<div>
			{/* <button onClick={() => logIn(this.clientId, this.code!)}>Log in</button> */}
        	<h1>Display your Spotify profile data</h1>
            	<section id="profile">
            		<h2>Logged in as <span id="displayName"></span></h2>
            		<span id="avatar"></span>
            		<ul>
            		    <li>User ID: <span id="id"></span></li>
            		    <li>Email: <span id="email"></span></li>
            		    <li>Spotify URI: <a id="uri" href="#"></a></li>
            		    <li>Link: <a id="url" href="#"></a></li>
            		    <li>Profile Image: <span id="imgUrl"></span></li>
            		</ul>
            	</section>
      	</div>
    	)
  	}
}