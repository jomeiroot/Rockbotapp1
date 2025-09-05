import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5174/api", // your proxy
});

export async function getNowPlaying(venueId: string) {
    const { data } = await api.get(`/now-playing/${venueId}`);
    return data;
}

export async function requestTrack(venueId: string, trackId: string) {
    const { data } = await api.post(`/request`, { venueId, trackId });
    return data;
}