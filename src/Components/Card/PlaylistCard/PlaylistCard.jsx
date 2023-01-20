import { useDispatch, useSelector } from 'react-redux';
import { BsFillPlayCircleFill, BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import '../Card.css'
import { setPlayer } from '../../../helpers/functions/setPlayer';
import { likedPlaylist } from '../../../helpers/functions/likeTrack';
import { useAuth0 } from '@auth0/auth0-react';

const PlaylistCard = ({ data, size, img }) => {
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.userSlice);
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    

    const openSong = (data) => {
        navigate(`/playlist/${data._id}`)
    }

    return (

        <div className='small'>
            {
                usersData.isLogged ? <button className='btnheart btn' onClick={() => likedPlaylist(data, usersData, dispatch, getAccessTokenSilently, serverUrl)}>{
                    usersData.userLogged.myplaylists.find((like) => like._id === data._id) ? <BsSuitHeartFill /> : <BsSuitHeart />
                }</button> : ""
            }
            <button className='btn btnplay' onClick={() => setPlayer(data.tracks, dispatch, usersData)}><BsFillPlayCircleFill /></button>

            <img onClick={() => openSong(data)} className={img} src={data.thumbnail} alt='img' />

            <div className="card-text imghover card-body mt-2">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text">{data.artist}</p>
            </div>
        </div>

    )
}

export default PlaylistCard