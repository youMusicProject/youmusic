// redux
import { useDispatch, useSelector } from 'react-redux';
import { setUserEdit } from '../../../redux/features/user/userSlice';
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IoIosArrowBack } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { useAuth0 } from '@auth0/auth0-react';
import { fetchEdit } from '../../../Api/putApi';
import { uploadCloudinary } from '../../../helpers/functions/uploadCloudinary';
import { fetchAddTrack } from '../../../Api/postApi';


export const UploadSong = ({ artist }) => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const dispatch = useDispatch();
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const { getAccessTokenSilently } = useAuth0();

    const userData = useSelector(state => state.userSlice);
    const user = userData.userLogged;


    function handleShow(v) {
        setFullscreen(v);
        setShow(true);
    }

    const uploadSong = async (e) => {
        e.preventDefault();
        const file_img = e.target.img.files;
        const file_song = e.target.song.files;
        // if(){}
        try {
            const src_img = await uploadCloudinary(file_img, "youmusic_img", "image");
            const src_song = await uploadCloudinary(file_song, "youmusic_song", "video");
            if (src_img && src_song) {
                const new_song = {
                    name: e.target.name.value,
                    artist: artist.name,
                    url: src_song,
                    thumbnail: src_img,
                    genre: e.target.genre.value
                }
                fetchAddTrack(serverUrl, new_song, getAccessTokenSilently, dispatch);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Button onClick={() => handleShow('sm-down')} className='btn border-none btn-secondary' variant='btn-link'>Upload song</Button>

            <Modal className='p-0' show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header>
                    <Modal.Title><IoIosArrowBack onClick={() => setShow(false)} className='cursor-pointer' /></Modal.Title>
                    <Modal.Title>YouMusic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='m-4 row'><h1 className='text-center'>Upload a new Song</h1></div>
                    <div className='mx-2'>


                        <form onSubmit={uploadSong} className="needs-validation">
                            <div className="row g-3">
                                <div className="form-floating mb-3">
                                    <input type="text" name="name" className="form-control" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Song Name</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" name="genre" className="form-control" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Song Genre</label>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="formFile" name="myImage" className="form-label">Song image</label>
                                    <input className="form-control" name='img' type="file" id="formFile" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formFile" name="mySong" className="form-label">Song (audio format)</label>
                                    <input className="form-control" name='song' type="file" id="formFile" />
                                </div>
                            </div>
                            <button className="mt-4 w-100 btn btn-color btn-lg" type="submit" onClick={() => setShow(false)}>Save</button>

                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )
}