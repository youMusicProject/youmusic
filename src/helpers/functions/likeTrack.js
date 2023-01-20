import { fetchLikeAlbum, fetchLikeArtist, fetchLikePlaylist, fetchLikeTrack } from "../../Api/putApi";
import { setUserEdit, setUserLikedAlbum, setUserLikedArtist, setUserLikedPlaylist, setUserLikedTrack, setUserUnlikedAlbum, setUserUnlikedArtist, setUserUnlikedPlaylist, setUserUnlikedTrack } from "../../redux/features/user/userSlice";

export const likedTrack = async (data, usersData, dispatch, getAccessTokenSilently, serverUrl) => {
    const checkLiked = usersData.userLogged.liked_tracks.find((like) => like._id === data._id)
    const token = await getAccessTokenSilently();

    if (!checkLiked) {
        const userEdited = {
            ...usersData.userLogged,
            'liked_tracks': [...usersData.userLogged.liked_tracks, data]
        }
        fetchLikeTrack(serverUrl, userEdited, token, dispatch, setUserEdit);
        dispatch(setUserLikedTrack(data));
    } else {
        const unlikedTrack = usersData.userLogged.liked_tracks.filter((track) => {
            return track.id !== data.id
        })
        const userEdited = {
            ...usersData.userLogged,
            'liked_tracks': unlikedTrack
        }
        fetchLikeTrack(serverUrl, userEdited, token, dispatch, setUserEdit);
        dispatch(setUserUnlikedTrack(userEdited))
    }
}

export const likedAlbum = (data, usersData, dispatch) => {
    const checkLiked = usersData.userLogged.liked_album.find((like) => like.id === data.id);
    if (!checkLiked) {
        const userEdited = {
            ...usersData.userLogged,
            'liked_album': [...usersData.userLogged.liked_album, data]
        }
        fetchLikeAlbum(userEdited);
        dispatch(setUserLikedAlbum(data));
    } else {
        const unlikedAlbum = usersData.userLogged.liked_album.filter((album) => {
            return album.id !== data.id
        })
        const userEdited = {
            ...usersData.userLogged,
            'liked_album': unlikedAlbum
        }
        fetchLikeAlbum(userEdited);
        dispatch(setUserUnlikedAlbum(userEdited))
    }
}

export const likedArtist = (data, usersData, dispatch) => {
    const checkLiked = usersData.userLogged.liked_artist.find((like) => like.id === data.id);

    if (!checkLiked) {
        const userEdited = {
            ...usersData.userLogged,
            'liked_artist': [...usersData.userLogged.liked_artist, data]
        }
        fetchLikeArtist(userEdited);
        dispatch(setUserLikedArtist(data));
    } else {


        const unlikedArtist = usersData.userLogged.liked_artist.filter((artist) => {
            return artist.id !== data.id
        })
        const userEdited = {
            ...usersData.userLogged,
            'liked_artist': unlikedArtist
        }
        fetchLikeArtist(userEdited);
        dispatch(setUserUnlikedArtist(userEdited))
    }
}

export const likedPlaylist = async (data, usersData, dispatch, getAccessTokenSilently, serverUrl) => {
    const checkLiked = usersData.userLogged.myplaylists.find((like) => like._id === data._id);
    const token = await getAccessTokenSilently();
    
    if (!checkLiked) {
        const userEdited = {
            ...usersData.userLogged,
            'myplaylists': [...usersData.userLogged.myplaylists, data]
        }
        dispatch(setUserLikedPlaylist(data));
        fetchLikePlaylist(serverUrl, userEdited, token, dispatch, setUserEdit);
    } else {
        const unlikedPlaylist = usersData.userLogged.myplaylists.filter((playlist) => playlist._id !== data._id)
        const userEdited = {
            ...usersData.userLogged,
            'myplaylists': unlikedPlaylist
        }
        dispatch(setUserUnlikedPlaylist(userEdited))
        fetchLikePlaylist(serverUrl, userEdited, token, dispatch, setUserEdit);
    }
}


