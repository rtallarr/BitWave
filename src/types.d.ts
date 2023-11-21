interface Image {
    url: string;
    height: number;
    width: number;
}

interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean,
        filter_locked: boolean
    },
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

interface Artist {
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

interface Track {
    album: {
        album_type: string;
        total_tracks: number;
        available_markets: string[];
        external_urls: { spotify: string; };
        href: string;
        id: string;
        images: Image[];
        name: string;
        release_date: string;
        release_date_precision: string;
        restrictions: { reason: string; };
        type: string;
        uri: string;
        artists: [
            {
                external_urls: { spotify: string; };
                href: string;
                id: string;
                name: string;
                type: string;
                uri: string;
            }
        ]
    }
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: { isrc: string; };
    external_urls: { spotify: string; };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
}