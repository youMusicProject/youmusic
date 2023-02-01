import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react'
import { Modal } from "react-bootstrap";
import { BsMusicNoteList } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddPlaylist } from '../../../Api/postApi';
import { uploadCloudinary } from '../../../helpers/functions/uploadCloudinary';

const ModalEditedPlaylist = () => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const usersData = useSelector(state => state.userSlice);
    const { getAccessTokenSilently } = useAuth0();
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    
    function handleShow(v) {
        setFullscreen(v);
        setShow(true);
    }
    const functionPlaylistEdited = async (e) => {
        e.preventDefault();

        try {
            const file = e.target.img.files
            const src = await uploadCloudinary(file, "youmusic_img", "image")

            const newPlaylist = {
                userId: usersData.userLogged._id,
                name: e.target.name.value,
                description: e.target.description.value,
                thumbnail: src,
                publicAccessible: e.target.public.value,
            }

            fetchAddPlaylist(serverUrl, newPlaylist, getAccessTokenSilently, dispatch);
            setShow(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>

            <li className='cursor-pointer' onClick={() => handleShow('sm-down')}>
                <BsMusicNoteList
                /> New Playlist 
            </li>

            <Modal centered className='p-0' show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header>
                    <Modal.Title><IoIosArrowBack onClick={() => setShow(false)} className='cursor-pointer' /></Modal.Title>
                    <Modal.Title>YouMusic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='m-4 row'><h1 className='text-center'>Create new Playlist</h1></div>
                    <div className='mx-2'>
                        <form onSubmit={(e) => functionPlaylistEdited(e)} className="needs-validation">
                            <div className="row g-3">

                                <div className="form-floating mb-3">
                                    <input type="text" name="name" className="form-control" id="floatingInput" placeholder="Playlist Name" />
                                    <label htmlFor="floatingInput">Playlist Name</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" name="description" className="form-control" id="floatingInput" placeholder="Description" />
                                    <label htmlFor="floatingInput">Description</label>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="formFile" name="myImage" accept="image/png, image/jpeg, image/jpg" className="form-label">Upload image for your playlist</label>
                                    <input className="form-control" name='img' type="file" />
                                </div>

                                <div className='form-floating mb-3'>
                                    <select name='public' id="publicPrivateOption">
                                        <option defaultValue={true}>Public</option>
                                        <option value={false}>Private</option>
                                    </select>
                                </div>

                            </div>

                            {/* <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" required />
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Public
                                </label>
                            </div> */}

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