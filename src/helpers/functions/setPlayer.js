import Swal from "sweetalert2";
import { fetchEditSong } from "../../Api/putApi";
import { setTrack } from "../../redux/features/player/playerSlice";

export const setPlayer = (songs, dispatch, usersData) => {
    usersData.isLogged ? dispatch(setTrack(songs)) 
    : Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'You must be logged',
        showConfirmButton: false,
        timer: 1500
    });
};

export const setPlayerAndFetch = async (data, dispatch, usersData, action, serverUrl, token, setTracksList, tracks) => {
    try {
        const track_edited = {
            ...data,
            views: data.views + 1
        }
        setPlayer([data], dispatch, usersData)
        await fetchEditSong(action, serverUrl, track_edited, token, dispatch, setTracksList, tracks)
    } catch (error) {
        
    }
}