import { useEffect, useState } from "react";
import { fetchTopTracks } from "../api/spotify";

export default function TopTracks({ token, time_range }: { token: string, time_range: string }) {

    const [topTracks, setTopTracks] = useState<any>([]); //! change to type track
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopTracks(token, time_range).then (res => {
            setTopTracks(res.items);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    //console.log("top tracks:", topTracks)

    return (
        <section id="top-tracks">
            <h2>Top 10 Tracks</h2>
            <ul>
                {topTracks && topTracks.map((track: Track) => (
                    <li key={track.id}>{track.name}</li>
                ))}
            </ul>
        </section>
    )
}