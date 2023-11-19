import React from 'react'

export default function SpotifyLogin() {
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	const API_PERMISSIONS = "user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"
	let REDIRECT_URI = "http://localhost:3000";

	if (process.env.NODE_ENV == 'production') {
		REDIRECT_URI = "https://bit-wave.vercel.app";
	}

	return (
		<button>
			<a href={`${AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${API_PERMISSIONS}`}>Login to spotify</a>
		</button>
	)
}