import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiFillStar } from "react-icons/ai";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import { BsFillPlayFill, BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { setPlayer } from '../../../helpers/functions/setPlayer';
import { likedArtist } from '../../../helpers/functions/likeTrack';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import { setUserLogged } from '../../../redux/features/user/userSlice';

export const TopInfoArtist = ({ data }) => {
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.userSlice);
    const tracks = useSelector(state => state.trackSlice);
    const tracksArtist = tracks.list.filter((track) => track.artist === data.name);
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { getAccessTokenSilently } = useAuth0();
    const artists = useSelector(state => state.artistSlice);
    const { id } = useParams();

    const followArtist = async (artist) => {
        // CREO QUE SERIA MAS FACIL SI METIESEEMOS AQUI DIRECTAMENTE LOS FOLLOWERS? EN VEZ DE ESTAR EN EL USUARIO PORQUE UN USUARIO NO DEBERIA DE TENER FOLLOWERS
        // SOLO LOS ARTISTAS, Y PARA ACCEDER A LA INFORMACION SUPONGO QUE ES LO MEJOR. NO SE MUY BIEN COMO RECOGERLA DESDE OTRO USUARIO
        try {
            const token = await getAccessTokenSilently()
            const validate = usersData.userLogged.follows.find((artist) => artist.name === data.name);
            if (!!validate) {
                console.log("dejar de seguir");
                // ID del usuario logeado (el que da unfollow)
                // ID del artista
                const response = await fetch(`${serverUrl}/api/user/unfollow`, {
                    method: "PUT",
                    body: JSON.stringify({
                        idLogged: usersData.userLogged._id,
                        idArtist: artist._id,
                        artistUserId: artist.userId,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                dispatch(setUserLogged(data.user))
            } else {
                const follow = {
                    _id: artist._id,
                    userId: artist.userId,
                    name: artist.name,
                    thumbnail: artist.thumbnail
                }

                const followers = {
                    ...usersData.userLogged,
                    follows: [...usersData.userLogged.follows, follow]

                }

                const response = await fetch(`${serverUrl}/api/user/follow/${followers._id}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        follow: follow,
                        followers: followers
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                dispatch(setUserLogged(data.user))
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="mx-0 song">
            <div className="">
                <div className="">
                    <div className="card-body little-profile p-4">
                        <div className='text-center'>
                            <div className="song">
                                <img src={data.thumbnail} className='rounded-circle' alt="user" />
                            </div>
                            <h3 className="m-b-0">{data.name}</h3>
                            {/* HAY QUE BUSCAR DENTRO DEL USUARIO DEL ARTISTA Y TRAER SU CANTIDAD DE FOLLOWERS Y HACERLE UN .LENGTH */}
                        </div>
                        <div className='containerButton--songpage'>
                            <button className="m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded containerButton--songpage__button" data-abc="true" onClick={() => setPlayer(tracksArtist, dispatch, usersData)} ><BsFillPlayFill /></button>
                            {
                                usersData.isLogged ? <button className='m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded containerButton--songpage__button' onClick={() => likedArtist(data, usersData, dispatch, getAccessTokenSilently, serverUrl)}>
                                    {
                                        usersData.userLogged.liked_artist.find((artist) => artist._id === data._id) ? <BsSuitHeartFill /> : <BsSuitHeart />
                                    }</button> : ""
                            }
                            {
                                usersData.isLogged ? <button className='m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded containerButton--songpage__button' onClick={() => followArtist(data)}>
                                    {
                                        usersData.userLogged.follows.find((artist) => artist.name === data.name) ? <SlUserUnfollow /> : <SlUserFollow />
                                    }</button> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}