import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Slider from '../Components/Slider/Slider'
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { BsFillPlayFill } from "react-icons/bs";
import { setPlayer } from '../helpers/functions/setPlayer';
import { breakpoints_small } from '../helpers/functions/breakpoint';
import { likedTrack } from '../helpers/functions/likeTrack';
import { TableSongs } from '../Components/TableSongs/TableSongs';
import { useAuth0 } from '@auth0/auth0-react';


const SongPage = () => {
    const { id } = useParams();
    const tracks = useSelector(state => state.trackSlice);
    const usersData = useSelector(state => state.userSlice);
    const song = tracks.list.find((track) => track._id === id);
    const dispatch = useDispatch();
    const genreSong = tracks.list.filter((track) => track.genre === song.genre);
    const listSameGenre = genreSong.filter((track) => track._id !== song._id)
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { getAccessTokenSilently } = useAuth0();

    return (
        <>
            <div className="mx-0 song">
                <div className="">
                    <div className="">
                        <div className="card-body little-profile p-4">
                            <div className='text-center'>
                                <div className="song">
                                    <img src={song.thumbnail} alt="user" />
                                </div>
                                <h3 className="m-b-0">{song.name}</h3>
                                <p>{song.artist}</p>
                            </div>
                            <div className='containerButton--songpage'>
                                <button className="m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded containerButton--songpage__button" data-abc="true" onClick={() => setPlayer([song], dispatch, usersData)} ><BsFillPlayFill /></button>
                                {
                                    usersData.isLogged ? <button className='m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded containerButton--songpage__button' onClick={() => likedTrack(song, usersData, dispatch, getAccessTokenSilently, serverUrl)}>
                                        {
                                            usersData.userLogged.liked_tracks.find((like) => like._id === song._id) ? <BsSuitHeartFill /> : <BsSuitHeart />
                                        }</button> : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <TableSongs songList={[song]} />

            <div className='cardContainer titleCards'>
                <div className='mt-2'>
                    <Slider
                        slidesPerView={1}
                        size='small'
                        img='img__small'
                        array={listSameGenre}
                        title='Songs of the same genre'
                        breakpoints={breakpoints_small}
                    />
                </div>
                <div className='mt-2'>
                    <Slider
                        slidesPerView={1}
                        size='small'
                        img='img__small'
                        array={tracks.list}
                        title='Tracks'
                        breakpoints={breakpoints_small}
                    />
                </div>
            </div>
        </>
    )
}

export default SongPage