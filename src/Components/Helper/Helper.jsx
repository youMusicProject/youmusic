import { useEffect } from "react";

// redux
import { fetchGet } from "../../Api/Api";
import { useDispatch } from 'react-redux';
import { setTracksList } from "../../redux/features/tracks/tracksSlice";
import { setArtistsList } from "../../redux/features/artists/artistsSlice";
import { setPlaylistsList } from "../../redux/features/playlist/playlistSlice";


export const Helper = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchGet(dispatch, "track", setTracksList);
        // fetchGetAlbums(dispatch);
        fetchGet(dispatch, "playlist", setPlaylistsList);
        fetchGet(dispatch, "artist", setArtistsList);
        // fetchGetGenresList(dispatch);
    }, [dispatch])

}