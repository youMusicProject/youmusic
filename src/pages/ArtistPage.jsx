import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AlbumSlider from '../Components/Slider/AlbumSlider/AlbumSlider';
import Slider from '../Components/Slider/Slider';
import { TopInfoArtist } from '../Components/TopInfo/TopInfoArtist/TopInfoArtist';
import { v4 as uuidv4 } from 'uuid';
import { TableSongs } from '../Components/TableSongs/TableSongs';
import { useEffect, useState } from 'react';

export const ArtistPage = () => {
    const { id } = useParams();
    const artists = useSelector(state => state.artistSlice);

    const tracks = useSelector(state => state.trackSlice);
    const albums = useSelector(state => state.albumSlice);

    const [tracksArtist, settracksArtist] = useState([]);
    const [artist, setartist] = useState();
    const [album, setalbum] = useState([]);

    //* Falta por hacer, necesitamos que primero carge el "artist y luego que mapee el genres"
    const [listGenreArtist, setlistGenreArtist] = useState([]);
    let similarSongs = listGenreArtist.flat();


    useEffect(() => {
        setartist(artists.list.find((element) => element._id === id));
    }, [artists]);

    useEffect(() => {
        if(!!artist) {
            settracksArtist(tracks.list.filter((track) => track.artist === artist.name));
            setalbum(albums.list.filter((album) => album.artist === artist.name));
        }

    }, [artist]);

    return (
        <>
            <TopInfoArtist data={!!artist ? artist : ""} />

            <TableSongs songList={tracksArtist} />

            <div className='titleCards cardContainer'>
                {
                    album.length > 0 &&
                    <div>
                        <AlbumSlider
                            slidesPerView={2}
                            size='small'
                            img='img__small'
                            array={album}
                            title='Artist albums'
                            breakpoints={{
                                600: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                                992: {
                                    slidesPerView: 5,
                                    spaceBetween: 10,
                                },
                                1200: {
                                    slidesPerView: 7,
                                    spaceBetween: 10,
                                },
                                1400: {
                                    slidesPerView: 8,
                                    spaceBetween: 10,
                                }
                            }}
                        />
                    </div>
                }
                {
                    similarSongs.length > 0 &&
                    <div className="mt-2">
                        <Slider
                            slidesPerView={2}
                            size='small'
                            img='img__small'
                            array={similarSongs}
                            title='Similar songs'
                            breakpoints={{
                                600: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: 4,
                                    spaceBetween: 10,
                                },
                                992: {
                                    slidesPerView: 5,
                                    spaceBetween: 10,
                                },
                                1200: {
                                    slidesPerView: 7,
                                    spaceBetween: 10,
                                },
                                1400: {
                                    slidesPerView: 8,
                                    spaceBetween: 10,
                                }
                            }}
                        />
                    </div>
                }
                {
                    listGenreArtist.length > 0 && listGenreArtist.map((e) => {
                        if (e.length > 0) {
                            return (
                                <div key={uuidv4()} className="mt-2">
                                    <Slider
                                        slidesPerView={2}
                                        size='small'
                                        img='img__small'
                                        array={e}
                                        title='Genres'
                                        breakpoints={{
                                            600: {
                                                slidesPerView: 3,
                                                spaceBetween: 10,
                                            },
                                            768: {
                                                slidesPerView: 4,
                                                spaceBetween: 10,
                                            },
                                            992: {
                                                slidesPerView: 5,
                                                spaceBetween: 10,
                                            },
                                            1200: {
                                                slidesPerView: 7,
                                                spaceBetween: 10,
                                            },
                                            1400: {
                                                slidesPerView: 8,
                                                spaceBetween: 10,
                                            }
                                        }}
                                    />
                                </div>
                            )
                        }

                    })
                }
            </div>
        </>
    )
}