import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import { fetchPostPlaylist } from '../Api/postApi';
import { addPlaylist } from '../redux/features/playlist/playlistSlice';

export const Playlist = () => {
    const usersData = useSelector(state => state.userSlice);
    const user = usersData.userLogged;
    const dispatch = useDispatch();
    

    const createPL = () => {
        const new_playlist = {
            id: uuidv4(),
            userId: user.id,
            name: "Esta es mi nueva playlist",
            thumbnail: "https://www.shutterstock.com/image-vector/playlist-neon-sign-vector-music-260nw-1795845130.jpg",
            description: "Estoy creando mi nueva PL que ilu",
            publicAccessible: true,
            tracks:[],
            primaryColor: "#fbdc00"
        }
        fetchPostPlaylist(new_playlist)
        dispatch(addPlaylist(new_playlist));

    }

    return (
        <>
            <div className="mx-0 song">
                <div className="">
                    <div className="">
                        <div className="card-body little-profile p-4">
                            <div className='text-center'>
                                <div className="song">
                                <img src={user.userData.profilePicture ? user.userData.profilePicture : 'https://bootdey.com/img/Content/avatar/avatar7.png'} alt="user" className='rounded-circle'/>
                                </div>
                                <h3 className="m-b-0">{user.userData.username}</h3>
                            </div>
                        </div>
                                <button onClick={() => createPL()} className="m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded containerButton--songpage__button" data-abc="true" >holi</button>
                    </div>
                </div>
            </div>
        </>
    )
}
