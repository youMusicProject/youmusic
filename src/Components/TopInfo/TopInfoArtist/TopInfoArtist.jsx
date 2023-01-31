import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiFillStar } from "react-icons/ai";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import { BsFillPlayFill, BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { setPlayer } from '../../../helpers/functions/setPlayer';
import { likedArtist } from '../../../helpers/functions/likeTrack';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';

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
        const follow = {
            _id: artist._id,
            userId: artist.userId,
            name: artist.name,
            thumbnail: artist.thumbnail
        }
        
        const followers = {
            ...usersData.userLogged,
            follows: [...usersData.userLogged.follows, follow ]
            
        }
        
        const token = await getAccessTokenSilently()
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
        //! HACER EL DISPATCH al user
        console.log(data);
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
                            <p>Followers: {}</p>
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
                                        usersData.userLogged.liked_artist.find((artist) => artist._id === data._id) ? <SlUserUnfollow /> : <SlUserFollow />
                                    }</button> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}