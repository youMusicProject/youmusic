import React from 'react'
import { BsFillPlayFill, BsSuitHeart, BsSuitHeartFill, BsTrash } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setPlayer } from '../helpers/functions/setPlayer';
import { v4 as uuidv4 } from 'uuid';
import PlaylistSlider from '../Components/Slider/PlaylistSlider/PlaylistSlider';
import { breakpoints_small } from '../helpers/functions/breakpoint';
import { likedPlaylist } from '../helpers/functions/likeTrack';
import { TableSongs } from '../Components/TableSongs/TableSongs';
import { useAuth0 } from '@auth0/auth0-react';
import { fetchDelete } from '../Api/deleteApi';
import { deletePlaylist } from '../redux/features/playlist/playlistSlice';

export const PlaylistPage = () => {
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.userSlice);
    const playlists = useSelector(state => state.playlistSlice.list);
    const { id } = useParams();
    const navigate = useNavigate();
    const playlist = playlists.find((element) => element._id === id);
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { getAccessTokenSilently } = useAuth0();
    const info = playlist.tracks;

    const removePlaylist = () => {
        try {
            const playlistToRemove = playlists.filter((p) => p._id !== playlist._id)
            const token = getAccessTokenSilently();
            fetchDelete("playlist", serverUrl, playlist, token, dispatch, deletePlaylist)
            dispatch(deletePlaylist(playlistToRemove))
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>

            <div className="mx-0 song">
                <div className="">
                    <div className="">
                        <div className="card-body little-profile p-4">
                            <div className='text-center'>
                                <div className="song">
                                    <img src={playlist.thumbnail} alt="user" />
                                </div>
                                <h3 className="m-b-0">{playlist.tracks.name}</h3>
                                <p>{playlist.name}</p>
                            </div>
                            <div className='containerButton--songpage'>
                                <button className="m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded containerButton--songpage__button" data-abc="true" onClick={() => setPlayer(info, dispatch, usersData)} ><BsFillPlayFill /></button>
                                {
                                    usersData.isLogged ? <button className='m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded containerButton--songpage__button' onClick={() => likedPlaylist(playlist, usersData, dispatch, getAccessTokenSilently, serverUrl)}>
                                        {
                                            usersData.userLogged.myplaylists.find((like) => like._id === playlist._id) ? <BsSuitHeartFill /> : <BsSuitHeart />
                                        }
                                        </button> : ""
                                }
                                {
                                    usersData.isLogged && playlist.userId === usersData.userLogged._id ?
                                        <button className='m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded containerButton--songpage__button' onClick={() => removePlaylist()}>
                                            <BsTrash />
                                        </button> : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TableSongs songList={info} />

            <div className="cardContainer titleCards">
                <PlaylistSlider
                    slidesPerView={1}
                    size='small'
                    img='img__small'
                    array={playlists}
                    title='Playlists'
                    breakpoints={breakpoints_small}
                />
            </div>
        </>
    )
}