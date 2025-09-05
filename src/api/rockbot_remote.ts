//This file will perform unsafe API operation -- ie. exposing the private API key

import axios from "axios";

const ROCKBOT_KEY = "TODO missing KEY"
const ROCKBOT_REMOTE_BASE = "https://api.rockbot.com/v3/remote"

const api = axios.create({
    baseURL: ROCKBOT_REMOTE_BASE,
    headers: {
        "Content-Type": "application/json",//what does this do
        Authorization: `Bearer ${ROCKBOT_KEY}`,//grab key from secret local key (not pushed to GITHUB) what is 'Bearer',
    },
    timeout: 5000,//small timeout for testing -- not sure what to set this to ie. rate limits

})

export async function getNowPlaying() {
    const {data} = await api.get("/remote/now_playing");
    return data;
}
//limited to 6 skips per hour...
export async function skipTrack(){
    const {data} = await api.get("/remote/track");
    return data;
}

export async function setVolume(volume:number){
    const v = Math.max(0, Math.min(10, Math.round(Number(volume))));
    const {data} = await api.patch("/remote/volume", {volume: v});
    return data;
}

export async function browsePlaylists(){
    const {data} = await api.get("/remote/browse_playlists");
    return data;
}

export async function currentPlaylistOverrides(){
    const {data} = await api.get("/remote/current_playlist");
    return data;
}
export async function addPlaylistOverride(playlistId:number, numMinsnumber){
    const {data} = await api.patch("/remote/add_playlist_override", {playlist_id: playlistId, duration:numMinsnumber});
    return data;
}

export async function removePlaylistOverride(playlistId:number){
    const {data} = await api.patch("/remote/remove_playlist_override", {playlist_id: playlistId});
    return data;
}

export async function banSong(song_id:number){
    const {data} = await api.patch("/remote/ban_song", {song_id: song_id});
    return data;
}