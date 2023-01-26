import React from 'react'
import { Tab, Table, Tabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const AdminArtistPanel = () => {
    // Buscar el artista con el id del user, mostrar sus propiedades
    const userRedux = useSelector(state => state.userSlice);
    console.log(userRedux);

    

    return (
        <div className="container mb-5">
            <div className="row no-gutters">
                <div className="col-md-4 col-lg-4"><img src="https://i.imgur.com/aCwpF7V.jpg" /></div>
                <div className="col-md-8 col-lg-8">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                            <h3 className="display-5">Your artist name</h3></div>
                        <div className="p-3 bg-black text-white">
                            <h6>New Artist &amp; User</h6>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <Tabs
                    defaultActiveKey="song"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="song" title="Song">

                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td colSpan={2}>Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </Table>

                    </Tab>
                    <Tab eventKey="album" title="Album">
                        <Table striped bordered hover >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td colSpan={2}>Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Tab>
                </Tabs>

            </div>
        </div>
    )
}
