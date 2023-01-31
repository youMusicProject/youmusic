import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './Aside.css'
import { AiOutlineHome, AiOutlinePlayCircle } from "react-icons/ai";
import { GiCheckboxTree, GiMedallist } from "react-icons/gi";
import { IoIosRadio } from "react-icons/io";
import { BsFileEarmarkMusicFill } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import ModalEditedPlaylist from '../Modals/ModalEditedPlaylist/ModalEditedPlaylist';
import Search from '../Search/Search';
import { useDispatch, useSelector } from 'react-redux';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { NavDropdown } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { fetchDelete } from '../../Api/deleteApi';
import { useAuth0 } from '@auth0/auth0-react';
import { deletePlaylist } from '../../redux/features/playlist/playlistSlice';

export const Aside = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("filter") ?? "";
    const userData = useSelector(state => state.userSlice);
    const playlists = useSelector(state => state.playlistSlice);
    const { getAccessTokenSilently } = useAuth0();
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const token = getAccessTokenSilently();
    // const openPlaylist = (data) => {
    //     navigate(`/playlist/${data._id}`)
    // }

    const removePlaylist = (playlist) => {
        const playlistToRemove = playlists.list.filter((p) => p._id !== playlist._id)
        console.log(playlistToRemove);
        dispatch(deletePlaylist(playlistToRemove))
        fetchDelete("playlist", serverUrl, playlist, token, dispatch, deletePlaylist)
    }
    
    const handleFilter = (e) => {
        setSearchParams({ filter: e.target.value });
    }
    
    return (
        <nav id="sidebar">
            <div className='container sidebar-header'>
                <div className="mt-3 cursor-pointer" onClick={() => navigate('/')}>
                    <h3>YouMusic</h3>
                </div>
                <div className="">
                    <div className='search mt-4 mb-2'>
                        <Search
                            handleFilter={handleFilter}
                            filter={filter}
                        />
                    </div>
                    <ul className="sidebar-nav">
                        <li><Link to='/'><AiOutlineHome className='me-1' /> Home</Link></li>
                        <li><Link to='/'><AiOutlinePlayCircle className='me-1' /> Listen</Link></li>
                        <li><Link to='/explore'><GiCheckboxTree className='me-1' /> Explore</Link></li>
                        <li><Link to='/'><IoIosRadio className='me-1' /> Radio</Link></li>
                        {userData.isLogged ? userData.userLogged.role === "user" ? <li><Link to='/pre/artistpanel'><GiMedallist className='me-1' />Become Artist</Link></li>
                            : <li><Link to='/artistpanel'><GiMedallist className='me-1' /> Artist Panel</Link></li>
                            : <li><Link to='/'><GiMedallist className='me-1' /> Become Artist</Link></li>}
                    </ul>
                </div>
                <div className="">
                    <ul className="sidebar-nav">
                            <ModalEditedPlaylist />
                        {
                            userData.userLogged &&
                            playlists.list.map((p) => {
                                if (p.userId === userData.userLogged._id) {
                                    return (
                                        <li key={uuidv4()} className='li-container'>
                                            {/* <Link to={openPlaylist(p)}> */}
                                                <div className='li--playlist__name'>
                                                    <BsFileEarmarkMusicFill className='me-1' /> {p.name}
                                                </div>
                                            {/* </Link> */}
                                            
                                            <div className='li--playlist__dots'>
                                                {/* <DropdownButton 
                                                    className='my-dropdown-toggle' 
                                                    title=<BiDotsVerticalRounded/>
                                                    >
                                                    <NavDropdown.Item key={uuidv4()} onClick={() => removePlaylist(p)}> Delete playlist</NavDropdown.Item>

                                                </DropdownButton> */}
                                            </div>
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </div>

            </div>
        </nav>
    )
}
