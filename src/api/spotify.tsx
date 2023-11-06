import axios from "axios";

export async function getArtist(id: string, token: string) {
    try {
        const res = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("err", error);
    }
}

export async function getProfile(token: string, nombre: string){
    try {
        const res = await axios.get(`https://api.spotify.com/v1/users/${nombre}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return res.data;
    } catch (error) {
        console.error("err", error);
    }
}