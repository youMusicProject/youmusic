import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchEdit } from "../../Api/putApi";
import { setUserEdit, setUserLikedTrack, setUserUnlikedTrack } from "../../redux/features/user/userSlice";

export const FollowUser = async (data, usersData, dispatch, getAccessTokenSilently, serverUrl, artists, id) => {
    const token = await getAccessTokenSilently();
    // A ESTE VALOR DEL LOG SE LE METE LA INFO DEL ARTISTA SEGUIDO Y LA INFO DE ESTE USUARIO PASA A FOLLOWERS DEL ARTISTA
    console.log(usersData.userLogged.follows);
    console.log(artists.list.find((artist) => artist._id === id));
    // const checkFollow = usersData.userLogged.follows.find(
    //     (like) => like._id === data._id
    // );
    // if (!checkLiked) {
    //   const userEdited = {
    //     ...usersData.userLogged,
    //     liked_tracks: [...usersData.userLogged.liked_tracks, data],
    //   };
    //   fetchEdit("user", serverUrl, userEdited, token, dispatch, setUserEdit);
    //   dispatch(setUserLikedTrack(data));
    // } else {
    //   const unlikedTrack = usersData.userLogged.liked_tracks.filter((track) => {
    //     return track._id !== data._id;
    //   });
    //   const userEdited = {
    //     ...usersData.userLogged,
    //     liked_tracks: unlikedTrack,
    //   };
    //   fetchEdit("user", serverUrl, userEdited, token, dispatch, setUserEdit);
    //   dispatch(setUserUnlikedTrack(userEdited));
    // }
};