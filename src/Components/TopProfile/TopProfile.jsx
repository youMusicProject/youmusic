import './TopProfile.css'
import { useSelector } from 'react-redux';
import { ModalEdit } from '../Modals/ModalEdit/ModalEdit';


export const TopProfile = () => {

    const userData = useSelector(state => state.userSlice);
    const user = userData.userLogged;

    return (
        <>
            <div className="mx-0 ">
                <div className="">
                    <div className="">
                        <img className="card-img-top" src="https://www.fotocasion.es/media/img/articulos/35203-fondo-colorama-rose-pink-84-27-FOTOCASION-OFERTA-DESCUENTO.jpg" alt="Cimage" />
                        <div className="card-body little-profile text-center p-2">
                            <div className="pro-img"><img src={user.userData.profilePicture ? user.userData.profilePicture : 'https://www.sfu.ca/content/sfu/communication/people/emeritus/linda-harasim/jcr:content/main_content/image.img.640.medium.png/1533071250636.png'} alt="user" /></div>
                            <div>
                                <h2>{user.userData.username} </h2>
                                <p>{user.userData.first_name} {user.userData.last_name}</p>
                                <p>{user.userData.email}</p>
                            </div>
                            <div className='profile__container--follows'>
                            {/* <button href="#" type="submit" className="btn btn-primary profile">Edit</button> */}
                                <p>Follows: {user.follows.length}</p>
                                <ModalEdit />
                                {
                                    user.followers.length > 0 ?
                                    <p>Followers: {user.followers.length}</p> : ''
                                }
                            {/* <a className="m-t-10 waves-effect waves-dark btn btn-primary btn-md btn-rounded" data-abc="true">Follow</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
