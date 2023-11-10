import axios from "axios";

//export async function getArtist(id: string, token: string) {
//    try {
//        const res = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
//            headers: {
//                Authorization: `Bearer ${token}`
//            }
//        });
//        return res.data;
//    } catch (error) {
//        console.error("err", error);
//    }
//}
//
//export async function getProfile(token: string, nombre: string){
//    try {
//        const res = await axios.get(`https://api.spotify.com/v1/users/${nombre}`, {
//            headers: {
//                Authorization: `Bearer ${token}`
//            }
//        });
//
//        return res.data;
//    } catch (error) {
//        console.error("err", error);
//    }
//}

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

export async function getAccessToken(clientId: string, code: string) {
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

export async function fetchProfile(token: string): Promise<any> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
}

