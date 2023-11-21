import { fetchProfile, fetchTopTracks, fetchTrack } from "../api/spotify";

export default function Dashboard({ token }: { token: string }) {
    //only make the request if there is a token
	if (token) {
		fetchProfile(token).then (res => {
			//console.log("profile: ", res)
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
		
		fetchTopTracks(token).then (res => {
			console.log("top tracks: ", res)

			fetchTrack(token, res.items[0].id).then (res => {
				console.log("track: ", res)
			})
			
		});
	}

    return (
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
    )
}