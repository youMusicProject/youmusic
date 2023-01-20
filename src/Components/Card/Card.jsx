import './Card.css';
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { setPlayer } from '../../helpers/functions/setPlayer';
import { likedTrack } from '../../helpers/functions/likeTrack';
import { useAuth0 } from '@auth0/auth0-react';


const Card = ({ data, size, img }) => {
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.userSlice);
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const openSong = (data) => {
        navigate(`/song/${data._id}`)
    }

    return (

        <div className={size} >
            {
                usersData.isLogged ? <button className='btnheart btn' onClick={() => likedTrack(data, usersData, dispatch, getAccessTokenSilently, serverUrl)}>{
                    usersData.userLogged.liked_tracks.find((like) => like._id === data._id) ? <BsSuitHeartFill /> : <BsSuitHeart />
                }</button> : ""
            }
            <button className='btn btnplay' onClick={() => setPlayer([data], dispatch, usersData)}><BsFillPlayCircleFill /></button>

            <img onClick={() => openSong(data)} className={img} src={data.thumbnail} alt='img' />

            <div className="card-text card-body">
                <h5 className="card-title mt-2">{data.name}</h5>
                <p className="card-text">{data.artist}</p>
            </div>
        </div>

    )
}

export default Card

