import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { fetchAddArtist } from "../Api/postApi";
import { uploadCloudinary } from "../helpers/functions/uploadCloudinary";


export const PreArtistPanel = () => {
    const { getAccessTokenSilently } = useAuth0();
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const usersData = useSelector(state => state.userSlice);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const userToArtist = async (e) => {
        e.preventDefault()
        try {
            const file = e.target.img.files
            const src = await uploadCloudinary(file, "youmusic_img", "image")
            const newArtist = {
                userId: usersData.userLogged._id,
                name: e.target.artistname.value,
                genres: [e.target.genres.value],
                gender: e.target.inlineRadioOptions.value,
                thumbnail: src
            }
            await fetchAddArtist(serverUrl, newArtist, getAccessTokenSilently, dispatch);
            navigate('/artistpanel')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mb-5">
            <div className="row no-gutters">
                <div className="img-panel col-md-4 col-lg-4"><img src="https://i.imgur.com/aCwpF7V.jpg" /></div>
                <div className="col-md-8 col-lg-8">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                            <h3 className="display-5">Become an artist!</h3></div>
                        <div className="p-3 bg-black text-white">
                            <h5>Turn your hobby into your job!</h5>
                            <h6>Upload your own music, and manage it.</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card shadow-2-strong card-registration" >
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>
                                <form onSubmit={userToArtist}>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">

                                            <div className="form-outline">
                                                <input type="text" id="firstName" className="form-control form-control-lg" placeholder={usersData.userLogged.userData.first_name} />
                                                <label className="form-label" htmlFor="firstName">First Name</label>
                                            </div>

                                        </div>
                                        <div className="col-md-6 mb-4">

                                            <div className="form-outline">
                                                <input type="text" id="lastName" className="form-control form-control-lg" placeholder={usersData.userLogged.userData.last_name} />
                                                <label className="form-label" htmlFor="lastName">Last Name</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 d-flex align-items-center">

                                            <div className="form-outline datepicker w-100">
                                                <input type="text" name="genres" className="form-control form-control-lg" id="birthdayDate" />
                                                <label htmlFor="birthdayDate" className="form-label">Genre of music you like</label>
                                            </div>

                                        </div>

                                        <div className="col-md-6 mb-4">

                                            <h6 className="mb-2 pb-1">Gender: </h6>

                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="femaleGender"
                                                    value="Female" />
                                                <label className="form-check-label" htmlFor="femaleGender">Female</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="maleGender"
                                                    value="Male" />
                                                <label className="form-check-label" htmlFor="maleGender">Male</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="otherGender"
                                                    value="Other" />
                                                <label className="form-check-label" htmlFor="otherGender">Other</label>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="mb-12">

                                            <div className="form-outline">
                                                <label className="form-label" htmlFor="emailAddress">Artist Name</label>
                                                <input name="artistname" type="text" id="emailAddress" className="form-control form-control-lg" />
                                            </div>

                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                        </div>
                                    </div>
                                    <div className="mb-12">
                                        <label htmlFor="formFile" name="myImage" accept="image/png, image/jpeg, image/jpg" className="form-label">Upload image for your playlist</label>
                                        <input className="form-control" name='img' type="file" />
                                    </div>

                                    <div className="mt-4 pt-2">
                                        <input className="btn btn-primary btn-lg" type="submit" value="Submit" />
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
