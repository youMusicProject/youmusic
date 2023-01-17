import { useEffect } from "react";

// redux
import { fetchGetAlbums, fetchGetArtists, fetchGetGenresList, fetchGetPlaylists, fetchGetTracks, fetchGetUsers } from "../../Api/Api";
import { useDispatch } from 'react-redux';


export const Helper = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchGetTracks(dispatch, "track");
        // fetchGetAlbums(dispatch);
        // fetchGetPlaylists(dispatch);
        // fetchGetArtists(dispatch);
        // fetchGetGenresList(dispatch);
    }, [dispatch])

}