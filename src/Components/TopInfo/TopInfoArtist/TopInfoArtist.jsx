import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiFillStar } from "react-icons/ai";
import { BsFillPlayFill, BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { setPlayer } from '../../../helpers/functions/setPlayer';
import { likedArtist } from '../../../helpers/functions/likeTrack';
import { getRandomInt } from '../../../helpers/functions/getRandom';
import { useAuth0 } from '@auth0/auth0-react';

export const TopInfoArtist = ({ data }) => {
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.userSlice);
    const tracks = useSelector(state => state.trackSlice);
    const tracksArtist = tracks.list.filter((track) => track.artist === data.name);
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { getAccessTokenSilently } = useAuth0();

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
                            <p className='icon__popularity--star'>{getRandomInt(100)}/100 <AiFillStar /></p>
                        </div>
                        <div className='containerButton--songpage'>
                            <button className="m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded containerButton--songpage__button" data-abc="true" onClick={() => setPlayer(tracksArtist, dispatch, usersData)} ><BsFillPlayFill /></button>
                            {
                                usersData.isLogged ? <button className='m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded containerButton--songpage__button' onClick={() => likedArtist(data, usersData, dispatch, getAccessTokenSilently, serverUrl)}>
                                    {
                                        usersData.userLogged.liked_artist.find((artist) => artist._id === data._id) ? <BsSuitHeartFill /> : <BsSuitHeart />
                                    }</button> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}