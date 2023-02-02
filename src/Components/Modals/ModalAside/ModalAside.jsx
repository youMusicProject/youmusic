import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { RxHamburgerMenu } from "react-icons/rx"
import { MainBtn } from '../../Buttons/MainBtn/MainBtn';
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { AvatarUser } from '../../AvatarUser/AvatarUser';
import ModalLogin from '../ModalLogin/ModalLogin';
import { AiOutlineHome, AiOutlinePlayCircle, AiOutlineSearch } from "react-icons/ai";
import { GiCheckboxTree } from "react-icons/gi";
import { IoIosRadio } from "react-icons/io";
import { GiMedallist } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { navigate_home_show } from '../../../helpers/functions/navigate_home_show';
import ModalEditedPlaylist from '../ModalEditedPlaylist/ModalEditedPlaylist';

const ModalAside = () => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const usersData = useSelector(state => state.userSlice);
    const userData = useSelector(state => state.userSlice);

    function handleShow(v) {
        setFullscreen(v);
        setShow(true);
    }


    return (
        <>
            <MainBtn
                name={<RxHamburgerMenu />}
                openModal={handleShow}
                className='text-dark'
                variant='link'
            />

            <Modal centered className='p-0' show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header className=''>
                    <IoIosArrowBack onClick={() => setShow(false)} className='cursor-pointer' />
                    <Modal.Title onClick={() => navigate_home_show(navigate, setShow)} className='cursor-pointer'>YouMusic</Modal.Title>
                    <div>{usersData.isLogged ? <AvatarUser /> : <ModalLogin />}</div>
                </Modal.Header>
                <Modal.Body>
                    <div className='search mt-4 mb-2'>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1" />
                            <span className="input-group-text cursor-pointer" id="basic-addon1"><AiOutlineSearch /></span>
                        </div>
                    </div>
                    <div className="">
                        <ul className="sidebar-nav">
                            <li onClick={() => setShow(false)}><Link to='/'><AiOutlineHome className='me-1' /> Home</Link></li>
                            <li onClick={() => setShow(false)}><Link to='/'><AiOutlinePlayCircle className='me-1' /> Listen</Link></li>
                            <li onClick={() => setShow(false)}><Link to='/explore'><GiCheckboxTree className='me-1' /> Explore</Link></li>
                            <li onClick={() => setShow(false)}><Link to='/'><IoIosRadio className='me-1' /> Radio</Link></li>
                            {userData.isLogged ? userData.userLogged.role === "user" ? <li><Link to='/pre/artistpanel'><GiMedallist className='me-1' />Become Artist</Link></li>
                                : <li><Link to='/artistpanel'><GiMedallist className='me-1' /> Artist Panel</Link></li>
                                : <li><Link to='/'><GiMedallist className='me-1' /> Become Artist</Link></li>}
                        </ul>
                    </div>
                    <div className="">
                        <ul onClick={() => setShow(false)} className="sidebar-nav">

                            <ModalEditedPlaylist />

                        </ul>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default ModalAside