import axios from "axios";

function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function redirectToAuthCode(clientId: string) {
	const verifier = generateCodeVerifier(128);
	const challenge = await generateCodeChallenge(verifier);

	localStorage.setItem('verifier', verifier);

	const params = new URLSearchParams();
	params.append('client_id', clientId);
	params.append('response_type', 'code');
	params.append('redirect_uri', "http://localhost:3000");
	params.append('scope', 'user-read-private user-read-email');
	params.append('code_challenge_method', 'S256');
	params.append('code_challenge', challenge);

	document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessToken(clientId: string, code: string): Promise<string> {
	const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

export async function fetchProfile(token: string): Promise<UserProfile> {
    const res = await axios.get(`https://api.spotify.com/v1/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
}

export async function fetchTopTracks(token: string): Promise<any> { //! create type for top tracks
    const res = await axios.get(`https://api.spotify.com/v1/me/top/tracks`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            time_range: 'long_term',
            limit: 10,
            offset: 0
        }
    });

    return res.data;
}

export async function fetchTopArtists(token: string): Promise<any> { //! create type for top artists
    const res = await axios.get(`https://api.spotify.com/v1/me/top/artists`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            time_range: 'long_term',
            limit: 10,
            offset: 0
        }
    });

    return res.data;
}

export async function fetchTrack(token: string, id: string): Promise<Track> {
    const res = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
}

export async function fetchArtist(token: string, id: string): Promise<Artist> {
    const res = await axios.get(`https://api.spotify.com/v1/artists${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return res.data;
}

export async function searchArtist(token: string, nombre: string): Promise<any> { //! create type for artist
    const res = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: nombre,
            type: 'artist'
        }
    });
    
    return res;
}