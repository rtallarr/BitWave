import { useEffect, useState } from "react"
import { fetchAudioFeatures, fetchTrack } from "../api/spotify"
import { GetMins, GetPorcentage } from "../utils/format";

export default function TrackStats({ token, trackId }: { token:string, trackId: string }) {

    const [audioFeatures, setAudioFeatures] = useState<any>([]); //! change to type audio features
    const [isLoading, setLoading] = useState(true);

    const [track, setTrack] = useState<Track>(); 

    useEffect(() => {
        fetchAudioFeatures(token, trackId).then (res => {
            setAudioFeatures(res);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        fetchTrack(token, trackId).then (res => {
            setTrack(res);
        });
    }, []);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    //console.log("audio features:", audioFeatures)

    return (
        <div>
            <h2>
                Track Stats - {track?.name ?? 'Loading...'}
            </h2>
            {/* <ul>
                {audioFeatures && Object.keys(audioFeatures).map((key: string) => (
                    <li key={key}>{key}: {audioFeatures[key]}</li>
                ))}
            </ul> */}
            <ul>
                <li>Duration: {GetMins(audioFeatures.duration_ms)}</li>
                <li>Danceability: {GetPorcentage(audioFeatures.danceability)}</li>
                <li>Energy: {GetPorcentage(audioFeatures.energy)}</li>
            </ul>
        </div>
    )
}