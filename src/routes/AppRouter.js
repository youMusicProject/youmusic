import { Routes, Route } from 'react-router-dom'
import { AdminArtistPanel } from '../pages/AdminArtistPanel'
import { AlbumPage } from '../pages/AlbumPage'
import { ArtistPage } from '../pages/ArtistPage'
import { ExplorePage } from '../pages/ExplorePage'
import GenrePage from '../pages/GenrePage'
import HomePage from '../pages/HomePage'
import { PlaylistPage } from '../pages/PlaylistPage'
import { PreArtistPanel } from '../pages/PreArtistPanel'
import { ProfilePage } from '../pages/ProfilePage'
import SearchPage from '../pages/SearchPage'
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
                <Route path="/artist/:id" element={<ArtistPage />} />
                <Route path="/explore/:genre" element={<GenrePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/search" element={<SearchPage />} />

                <Route path='/profile' element={<PrivateRoutes><ProfilePage /></PrivateRoutes>} />
                <Route path="/artistpanel" element={<PrivateRoutes><AdminArtistPanel /></PrivateRoutes>} />
                <Route path="/pre/artistpanel" element={<PrivateRoutes><PreArtistPanel /></PrivateRoutes>} />
            </Routes>
        </>
    )
}

export default AppRouter