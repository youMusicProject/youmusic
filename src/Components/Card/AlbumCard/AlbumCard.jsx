import { useDispatch, useSelector } from 'react-redux';
import { BsFillPlayCircleFill, BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import '../Card.css'
import { setPlayer } from '../../../helpers/functions/setPlayer';
import { likedAlbum } from '../../../helpers/functions/likeTrack';
import { useAuth0 } from '@auth0/auth0-react';

const AlbumCard = ({ data, size, img }) => {
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.userSlice);
    const navigate = useNavigate();
    const { getAccessTokenSilently } = useAuth0();
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    // const song = tracks.list.find((track) => track._id === id);
    const openSong = (data) => {
        navigate(`/album/${data._id}`)
    }

    // console.log(data);

    return (

        <div className='imgbig' >
            <div className="card-text card-body mb-2">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text">{data.artist}</p>
            </div>
            {
                usersData.isLogged ? <button className='btnheart btn' onClick={() => likedAlbum(data, usersData, dispatch, getAccessTokenSilently, serverUrl)}>{
                    usersData.userLogged.liked_album.find((like) => like._id === data._id) ? <BsSuitHeartFill /> : <BsSuitHeart />
                }</button> : ""
            }
            <button className='btn btnplay' onClick={() => setPlayer(data.tracks, dispatch, usersData)}><BsFillPlayCircleFill /></button>

            <img onClick={() => openSong(data)} className={img} src={data.thumbnail} alt='img' />

        </div>

    )
}

export default AlbumCard