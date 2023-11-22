export default function SpotifyLogin() {
	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	const APP_PERMISSIONS = "user-read-email user-read-private user-top-read";
	let REDIRECT_URI = "http://localhost:3000";

	if (process.env.NODE_ENV == 'production') {
		REDIRECT_URI = "https://bit-wave.vercel.app";
	} 

	return (
  		<div>
			<a href={`${AUTH_ENDPOINT}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=${APP_PERMISSIONS}`}>
				Login to spotify
			</a>
  		</div>
	)
}