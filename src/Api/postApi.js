import axios from "axios";
import { setNewArtist } from "../redux/features/artists/artistsSlice";
import { createNewPlaylist } from "../redux/features/playlist/playlistSlice";
import { setAddTrack } from "../redux/features/tracks/tracksSlice";
import { setUserLogged } from "../redux/features/user/userSlice";

export const fetchAddPlaylist = async (serverURL, newPlaylist, getAccessTokenSilently, dispatch, ) => {
    try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${serverURL}/api/playlist/new`, {
            method: "POST",
            body: JSON.stringify(newPlaylist),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json();

        dispatch(createNewPlaylist(data.info))
    } catch (error) {
        console.log(error);
    }
}

export const fetchAddArtist = async (serverURL, newArtist, getAccessTokenSilently, dispatch) => {
    try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${serverURL}/api/artist/new`, {
            method: "POST",
            body: JSON.stringify(newArtist),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json();
        dispatch(setUserLogged(data.user));
        dispatch(setNewArtist(data.artist));
    } catch (error) {
        console.log(error);
    }
}

export const fetchAddTrack = async (serverURL, newTrack, getAccessTokenSilently, dispatch) => {
    try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${serverURL}/api/track/new`, {
            method: "POST",
            body: JSON.stringify(newTrack),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json();
        dispatch(setAddTrack(data.info));
    } catch (error) {
        console.log(error);
    }
}