import ModalAside from '../Modals/ModalAside/ModalAside';
import { useSelector } from 'react-redux';
import MediaQuery from 'react-responsive'
import AuthenticationButton from '../Auth0/AuthenticationButton';

export function Header() {

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <div type="button" id="sidebarCollapse" className="">
                    <MediaQuery maxWidth={600} >
                        <ModalAside />
                    </MediaQuery>
                </div>
                {/* {usersData.isLogged ? <AvatarUser /> : <ModalLogin />} */}
                <AuthenticationButton />
            </div>
        </nav>
    );
}