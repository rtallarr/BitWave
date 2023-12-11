import { useEffect, useState } from "react";
import { fetchSavedTracks } from "../api/spotify";

export default function SavedTracks({ token }: { token: string }) {

    const [savedTracks, setSavedTracks] = useState<any>([]); //! change to type saved tracks
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetchSavedTracks(token).then (res => {
            setSavedTracks(res);
            setLoading(false);
        });
    }, []);

    if (isLoading) {
        return <div className="App">Loading...</div>;
    }

    console.log("saved-tracks:", savedTracks)

    return (
        <section id="saved-tracks">
            <h2>Saved songs</h2>
            <ul>
                {savedTracks && savedTracks.map((savedTrack: any) => (
                    <li key={savedTrack.track.id}>{savedTrack.track.name}</li>
                ))}
            </ul>
        </section>
    )
}