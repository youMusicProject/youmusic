import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from '../Components/Slider/Slider'
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import { BsFillPlayFill } from "react-icons/bs";
import { setPlayer } from '../helpers/functions/setPlayer';
import { breakpoints_small } from '../helpers/functions/breakpoint';
import { TbPlaylistAdd } from "react-icons/tb";
import { DropdownButton } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';


const SongPage = () => {
    const { id } = useParams();
    const tracks = useSelector(state => state.trackSlice);
    const usersData = useSelector(state => state.userSlice);

    const [song, setSong] = useState(tracks.list.find((track) => track.id === parseInt(id)))
    // const [genreSong, setGenreSong] = useState(tracks.list.filter((track) => track.genre === song.genre))
    // const [listSameGenre, setListSameGenre] = useState(genreSong.filter((track) => track.id !== song.id))

    const dispatch = useDispatch();
    const genreSong = tracks.list.filter((track) => track.genre === song.genre);
    const listSameGenre = genreSong.filter((track) => track.id !== song.id);

    const playlist = useSelector(state => state.playlistSlice.list);
    const [playlist_accesible, setPlaylist] = useState([]);

    useEffect(() => {
        if (usersData.isLogged) { setPlaylist(playlist.filter(e => e.userId === usersData.userLogged.id)); }
    }, [usersData.isLogged, playlist])

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
                            </div>
                            <button className="m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded containerButton--songpage__button" data-abc="true" onClick={() => setPlayer([song], dispatch, usersData)} ><BsFillPlayFill /></button>
                            {
                                usersData.isLogged ? <button className='m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded containerButton--songpage__button'>{
                                    usersData.userLogged.liked_tracks.find((like) => like.id === song.id) ? <BsSuitHeartFill /> : <BsSuitHeart />
                                }</button> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className='mx-2 mb-4'>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Title</th>
                            <th scope="col">Artist</th>
                            <th scope="col">Genre</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='cursor-pointer'>
                            <td onClick={() => setPlayer([song], dispatch, usersData)} className='cursor-pointer tdhover'><BsFillPlayFill /></td>
                            <td>{song.name}</td>
                            <td>{song.artist}</td>
                            <td>{song.genre}</td>
                            <td>
                                <DropdownButton
                                    className='my-dropdown-toggle'
                                    drop=''
                                    variant=""
                                    title=<TbPlaylistAdd className='icon color-purple' />
                                >
                                    {// no funciona creo que tiene que ver con el playlist accesible al hacer el map,
                                        // siguiente paso mostrar las playlist que puedes añadirle y al hacer click añadirla a la bd
                                        usersData.isLogged ?? playlist_accesible ? playlist_accesible.map((e, i) => {
                                            return (
                                                <Dropdown.Item eventKey={i}>hola</Dropdown.Item>
                                            )
                                        }) : <Dropdown.Item eventKey="2">You should to log in!</Dropdown.Item>
                                    }

                                </DropdownButton>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>


            <div className='mx-2 mt-2'>
                <Slider
                    slidesPerView={1}
                    size='small'
                    img='img__small'
                    array={listSameGenre}
                    title='Songs of the same genre'
                    breakpoints={breakpoints_small}
                />
            </div>
            <div className='mx-2 mt-2'>
                <Slider
                    slidesPerView={1}
                    size='small'
                    img='img__small'
                    array={tracks.list}
                    title='Tracks'
                    breakpoints={breakpoints_small}
                />
            </div>
        </>
    )
}

export default SongPage