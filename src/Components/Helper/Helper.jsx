import { useEffect } from "react";

// redux
import { fetchGet } from "../../Api/Api";
import { useDispatch } from 'react-redux';
import { setTracksList } from "../../redux/features/tracks/tracksSlice";
import { setArtistsList } from "../../redux/features/artists/artistsSlice";
import { setPlaylistsList } from "../../redux/features/playlist/playlistSlice";
import { setAlbumsList } from "../../redux/features/albums/albumsSlice";
import { setGenresList } from "../../redux/features/genres/genresSlice";



export const Helper = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchGet(dispatch, "track", setTracksList);
        fetchGet(dispatch, "album", setAlbumsList);
        fetchGet(dispatch, "playlist", setPlaylistsList);
        fetchGet(dispatch, "artist", setArtistsList);
        fetchGet(dispatch, "genre", setGenresList);
        // fetchGetGenresList(dispatch);
    }, [dispatch])

}