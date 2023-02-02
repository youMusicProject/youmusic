import { useSelector } from "react-redux"
import AlbumSlider from "../Components/Slider/AlbumSlider/AlbumSlider";
import PlaylistSlider from "../Components/Slider/PlaylistSlider/PlaylistSlider";
import ArtistSlider from "../Components/Slider/ArtistSlider/ArtistSlider";
import Slider from "../Components/Slider/Slider"
import { breakpoints_album, breakpoints_small } from "../helpers/functions/breakpoint";
import SearchPage from "./SearchPage";
import { useSearchParams } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const HomePage = () => {
  const userData = useSelector(state => state.userSlice);
  const playlists = useSelector(state => state.playlistSlice);
  const albums = useSelector(state => state.albumSlice);
  const tracks = useSelector(state => state.trackSlice);
  const artists = useSelector(state => state.artistSlice);
  // console.log(userData.userLogged._id);
  const publicAccessiblePlaylist = playlists.list.filter((playlist) => playlist.publicAccessible === "true")
  const artistsWithoutMe = userData.userLogged ? artists.list.filter((artist) => artist.userId !== userData.userLogged._id) : artists.list
    
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") ?? "";
  
  const viewsQuantity = tracks.list.map((e) => e)
  const trends = viewsQuantity.sort((a, b) => b.views - a.views)

  const { isLoading, error } = useAuth0();

  const handleFilter = (e) => {
    setSearchParams({ filter: e.target.value });
  }

  const loader = () => {
    return (
      <div className="cardContainer">
      {
        <div className='imgbig'>
            <SkeletonTheme baseColor="gray" highlightColor="#ddd">
            <div className="card-text card-body mb-2">
                <h5 className="card-title"><Skeleton /></h5>
                <p className="card-text"><Skeleton /></p>
            </div>
            <div className="d-flex">
                    <Skeleton width={562} height={320} variant="rect" />
                    <Skeleton width={562} height={320} variant="rect" />
            </div>

            <div className="mx-2 titleCards">
                <h5 className="card-title"><Skeleton /></h5>
            </div>
            <div className="d-flex">
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
            </div>

            <div className="mx-2 titleCards">
                <h5 className="card-title"><Skeleton /></h5>
            </div>
            <div className="d-flex">
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
            </div>
            <div className="mx-2 titleCards">
                <h5 className="card-title"><Skeleton /></h5>
            </div>
            <div className="d-flex">
                <Skeleton width={176} height={176} variant="circle" />
                <Skeleton width={176} height={176} variant="circle" />
                <Skeleton width={176} height={176} variant="circle" />
                <Skeleton width={176} height={176} variant="circle" />
                <Skeleton width={176} height={176} variant="circle" />
                <Skeleton width={176} height={176} variant="circle" />
                <Skeleton width={176} height={176} variant="circle" />
                <Skeleton width={176} height={176} variant="circle" />
            </div>
            <div className="mx-2 titleCards">
                <h5 className="card-title"><Skeleton /></h5>
            </div>
            <div className="d-flex">
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
                <Skeleton width={176} height={176} variant="rect" />
            </div>
            <div className="mx-2 titleCards">
                <h5 className="card-title"><Skeleton /></h5>
            </div>
            <div className="d-flex">
                <Skeleton width={176} height={176} variant="circle" />
                <Skeleton width={176} height={176} variant="circle" />
                <Skeleton width={176} height={176} variant="circle" />
                <Skeleton width={176} height={176} variant="circle" />
                <Skeleton width={176} height={176} variant="circle" />
                <Skeleton width={176} height={176} variant="circle" />
                <Skeleton width={176} height={176} variant="circle" />
                <Skeleton width={176} height={176} variant="circle" />
            </div>
            </SkeletonTheme>
        </div>
      }
    </div>
    )
  }

  if (isLoading) {
    return (
      loader()
    )
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }


  return (
    <>
      <div className="cardContainer">
        {
          filter ?
            <SearchPage
              handleFilter={handleFilter}
              filter={filter}
            />
            :
            <div>
              <div className="mx-2 titleCards">
                <AlbumSlider
                  slidesPerView={1}
                  size='big'
                  img='img__big'
                  array={albums.list}
                  title='Albums'
                  breakpoints={breakpoints_album}
                />
              </div>

              <div className="mx-2 titleCards">
                <Slider
                  slidesPerView={1}
                  size='small'
                  img='img__small'
                  array={trends}
                  title='Trends'
                  breakpoints={breakpoints_small}
                />
              </div>
              {
                
                  <div className="mx-2 titleCards">
                    <PlaylistSlider
                      slidesPerView={1}
                      size='small'
                      img='img__small'
                      array={publicAccessiblePlaylist}
                      title='Playlists'
                      breakpoints={breakpoints_small}
                    />
                  </div>
              }

                <div className="mx-2 titleCards">
                <ArtistSlider
                  slidesPerView={2}
                  size='small'
                  img='img__small img__small--circle'
                  array={artistsWithoutMe}
                  title='Artist'
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

              <div className="mx-2 titleCards">
                <Slider
                  slidesPerView={1}
                  size='small'
                  img='img__small'
                  array={tracks.list}
                  title='Tracks'
                  breakpoints={breakpoints_small}
                />
              </div>
              {
                userData.userLogged && userData.userLogged.follows.length > 0 ?
                <div className="mx-2 titleCards">
                  <ArtistSlider
                    slidesPerView={2}
                    size='small'
                    img='img__small img__small--circle'
                    array={userData.userLogged.follows}
                    title='Followed Artist'
                    breakpoints={breakpoints_small}
                  />
                </div> : ''
              }

            </div>
        }
      </div>
    </>
  )
}

export default HomePage