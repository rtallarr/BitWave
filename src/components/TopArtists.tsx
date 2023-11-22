import { useEffect, useState } from "react";
import { fetchTopArtists } from "../api/spotify";

export default function TopArtists({ token }: { token: string }) {

    const [topArtists, setTopArtists] = useState<any>([]); //! change to type Artists
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopArtists(token).then (res => {
            setTopArtists(res.items);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    //console.log("top Artists:", topArtists)

    return (
        <section id="top-artists">
            <h2>Top 10 Artists</h2>
            <ul>
                {topArtists && topArtists.map((artist: Artist) => (
                    <li key={artist.id}>{artist.name}</li>
                ))}
            </ul>
        </section>
    )
}