import axios from "axios";
import { createNewPlaylist } from "../redux/features/playlist/playlistSlice";

export const fetchAddPlaylist = async (serverURL, newPlaylist, getAccessTokenSilently, dispatch) => {
    try {
        const token = await getAccessTokenSilently();
    
        const response = await fetch(`${serverURL}/api/playlist/createplaylist`, {
            method: "POST",
            body: JSON.stringify(newPlaylist),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        const data = await response.json();
        dispatch(createNewPlaylist(newPlaylist))
        
    } catch (error) {
        console.log(error);
    }
}