import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './Aside.css'
import { AiOutlineHome, AiOutlinePlayCircle } from "react-icons/ai";
import { GiCheckboxTree, GiMedallist } from "react-icons/gi";
import { IoIosRadio } from "react-icons/io";
import { BsFileEarmarkMusicFill } from "react-icons/bs";
import ModalEditedPlaylist from '../Modals/ModalEditedPlaylist/ModalEditedPlaylist';
import Search from '../Search/Search';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

export const Aside = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get("filter") ?? "";
    const userData = useSelector(state => state.userSlice);
    const playlists = useSelector(state => state.playlistSlice);
    
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
                                    const linkPlaylist = `/playlist/${p._id}`
                                    return (
                                        <li key={uuidv4()} className='li-container'>
                                                <div className='li--playlist__name'>
                                                    <Link to={linkPlaylist}>
                                                        <BsFileEarmarkMusicFill className='me-1' /> {p.name}
                                                    </Link>
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
