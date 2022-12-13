import { Routes, Route } from 'react-router-dom'
import { AlbumPage } from '../pages/AlbumPage'
import EditedPlaylist from '../pages/EditedPlaylist'

import HomePage from '../pages/HomePage'
import { PlaylistPage } from '../pages/PlaylistPage'
import { ProfilePage } from '../pages/ProfilePage'
import SongPage from '../pages/SongPage'
import { PrivateRoutes } from './PrivateRoutes'


const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<HomePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/song/:id" element={<SongPage />} />
                <Route path="/album/:id" element={<AlbumPage />} />
                <Route path="/playlist/:id" element={<PlaylistPage />} />
                <Route path="/myplaylist/:id" element={<EditedPlaylist />} />
        


                <Route path='/profile' element={<PrivateRoutes><ProfilePage /></PrivateRoutes>} />
            </Routes>
        </>
    )
}

export default AppRouter