import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Slider from '../Components/Slider/Slider'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { setTrack } from '../redux/features/player/playerSlice';
import { BsFillPlayFill } from "react-icons/bs";

const SongPage = () => {
    const { id } = useParams();
    const tracks = useSelector(state => state.trackSlice);
    const UsersData = useSelector(state => state.userSlice);
    const song = tracks.list.find((track) => track.id === parseInt(id));
    const dispatch = useDispatch();

    const setPlayer = (song) => {
        UsersData.isLogged ? dispatch(setTrack(song)) : console.log('Tienes que logearte para escuchar la cancion');
    }

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
                            <button className="m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded" data-abc="true" onClick={()=> setPlayer(song)} >Play <BsFillPlayFill /></button>
                            <button className="m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded" data-abc="true"  > <AiOutlineHeart /></button>

                        </div>
                    </div>
                </div>
            </div>


            <div className='container mb-4'>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Title</th>
                            <th scope="col">Artist</th>
                            <th scope="col">Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='cursor-pointer'>
                            <td onClick={()=> setPlayer(song)} className='cursor-pointer tdhover'><BsFillPlayFill /></td>
                            <td>{song.name}</td>
                            <td>{song.artist}</td>
                            <td>{song.genre}</td>

                        </tr>

                    </tbody>
                </table>
            </div>


            <div className='container mt-2'>
                <Slider
                    slidesPerView={2}
                    spaceBetween={100}
                    size='small'
                    img='img__small'
                    array={tracks}
                    title='Similar song'
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 6,
                            spaceBetween: 40,
                        },
                    }}
                />
            </div>
        </>
    )
}

export default SongPage