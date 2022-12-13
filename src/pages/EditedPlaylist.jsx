import { BsFillPlayFill, BsSuitHeartFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const EditedPlaylist = () => {
    const usersData = useSelector(state => state.userSlice);


    return (
        <>
            <div className="mx-0 song">
                <div className="">
                    <div className="">
                        <div className="card-body little-profile p-4">
                            <div className='text-center'>
                                <div className="song">
                                    <img src="" alt="user" />
                                </div>
                                <h3 className="m-b-0">Nombre playlist</h3>
                                <p></p>
                            </div>
                            <div className='containerButton--songpage'>
                                <button className="m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded containerButton--songpage__button" data-abc="true" onClick="" ><BsFillPlayFill /></button>
                                <button className="m-t-10 mx-2 waves-effect waves-dark btn btn-dark btn-svg btn-md btn-rounded containerButton--songpage__button" data-abc="true"  > <BsSuitHeartFill /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mx-2 mb-4'>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Title</th>
                            <th scope="col">Artist</th>
                            <th scope="col">Genre</th>
                        </tr>
                    </thead>

                    <tbody>

                  
        
                            <tr className='cursor-pointer' >
                                <td onClick=""className='cursor-pointer tdhover'><BsFillPlayFill /></td>
                                <td></td>
                                <td></td>
                                <td></td>

                            </tr>
                     


                    </tbody>
                </table>
            </div>



        </>
    )
}

export default EditedPlaylist