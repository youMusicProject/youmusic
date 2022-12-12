// import { useNavigate } from 'react-router-dom';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsThreeDots } from "react-icons/bs";

const DropdownDot = () => {

    // const navigate = useNavigate();

    return (
        <>
            <DropdownButton
                className='my-dropdown-toggle'
                drop=''
                variant=""
                title=<BsThreeDots className='icon color-purple'
                />
            >
                {/* <Dropdown.Item eventKey="1" onClick={() => navigate('/')}>Add to playlist</Dropdown.Item> */}
                <Dropdown.Item eventKey="2">Share</Dropdown.Item>
                <Dropdown.Item eventKey="3">Something</Dropdown.Item>
                <Dropdown.Divider />

            </DropdownButton>
        </>
    )
}

export default DropdownDot