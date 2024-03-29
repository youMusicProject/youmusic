// redux
import { useDispatch, useSelector } from 'react-redux';


import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";


export const ModalRegister = () => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');

    function handleShow(v) {
        setFullscreen(v);
        setShow(true);
    }

    return (
        <>
            <Button variant='link' onClick={() => handleShow('sm-down')} className='text-decoration-none color-pink'>Create New YouMusic ID <IoIosArrowForward /></Button>

            <Modal centered className='p-0' show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                <Modal.Header>
                    <Modal.Title><IoIosArrowBack onClick={() => setShow(false)} className='cursor-pointer' /></Modal.Title>
                    <Modal.Title>YouMusic</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='m-4 row'><h1 className='text-center'>Create ID</h1></div>
                    <div className='mx-2'>
                        <form className="needs-validation">
                            <div className="row g-3">

                                <div className="form-floating mb-3">
                                    <input type="text" name="username" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Username</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" name="firstname" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">First name</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="text" name="lastname" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Last name</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="email" name="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                            </div>

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" required />
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Agree to Terms & Conditions
                                </label>
                            </div>
                            <h6 className='register__email--error mt-2'>{error}</h6>
                            <button className="mt-2 w-100 btn btn-color btn-lg" type="submit">Create Account</button>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    )
}