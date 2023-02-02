import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react'
import { Modal } from "react-bootstrap";
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { AiOutlineEdit } from "react-icons/ai";
import { fetchEditSong } from '../../../Api/putApi';
import { setTracksList } from '../../../redux/features/tracks/tracksSlice';

const ModalEditedPlaylist = ({ track, tracks }) => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const { getAccessTokenSilently } = useAuth0();
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    function handleShow(v) {
        setFullscreen(v);
        setShow(true);
    }
    const editsong = async (e) => {
        e.preventDefault();
        const token = getAccessTokenSilently();
        try {
            // const file = e.target.img.files;
            // const src = await uploadCloudinary(file, "youmusic_img", "image");

            const edited_song = {
                ...track,
                name: e.target.name.value,
                // url: src_song,
                // thumbnail: src_img,
                genre: e.target.genre.value
            }
            console.log(edited_song);
            fetchEditSong("track", serverUrl, edited_song, token, dispatch, setTracksList, tracks);
            setShow(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <button className="btn btn-outline-success btn-sm px-3" onClick={() => handleShow('sm-down')}>
                <AiOutlineEdit />
            </button>

            <Modal centered className='p-0' show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header>
                    <Modal.Title><IoIosArrowBack onClick={() => setShow(false)} className='cursor-pointer' /></Modal.Title>
                    <Modal.Title>YouMusic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='m-4 row'><h1 className='text-center'>Edit Song</h1></div>
                    <div className='mx-2'>
                        <form onSubmit={editsong} className="needs-validation">
                            <div className="row g-3">

                                <div className="form-floating mb-3">
                                    <input type="text" name="name" className="form-control" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Song Name</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" name="genre" className="form-control" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Song Genre</label>
                                </div>

                                {/* <div className="mb-3">
                                    <label htmlFor="formFile" name="myImage" className="form-label">Song image</label>
                                    <input className="form-control" name='img' type="file" id="formFile" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="formFile" name="mySong" className="form-label">Song (audio format)</label>
                                    <input className="form-control" name='song' type="file" id="formFile" />
                                </div> */}
                            </div>

                            <h6 className='register__email--error mt-2'></h6>
                            <button className="mt-2 w-100 btn btn-color btn-lg" type="submit">Save</button>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditedPlaylist