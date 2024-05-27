import { useEffect, useState } from "react";
import databaseService from "../appwrite/database";
import { Link } from "react-router-dom";
import {
  PlaylistPreview,
  LoadingIndicator,
  AlbumPreview,
  SongPreview,
} from "../components/index";
import { useSelector, useDispatch } from "react-redux";
// import authService from "../appwrite/auth";
// import { login } from "../store/authSlice";

function Home() {
  const [playlists, setPlaylists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    const fetch = async () => {
      try {
        const playlists = await databaseService.getPlaylists();
        setPlaylists(playlists.documents);
        const albums = await databaseService.getAlbums();
        setAlbums(albums.documents);
      } catch (error) {
        console.log("Error fetching in home", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [dispatch]);

  if (loading) return <LoadingIndicator />;
  return (
    <div id="home" className="flex-grow">
      {/* <!-- Nested flex container --> */}
      <div className="flex flex-col p-2 h-full space-y-2">
        {/* <!-- Recents --> */}
        <div id="recents" className="p-2">
          <h1 className="text-xl font-lato mb-1 text-white p-1">Recents</h1>
          {/* <!-- Songs Div --> */}
          <div id="songs" className="flex flex-wrap space-x-3">
            {/* <!-- Song Items go here --> */}
            {userInfo.recents.map((trackId) => {
              return (
                <div key={trackId}>
                  <SongPreview trackId={trackId} />
                </div>
              );
            })}
          </div>
        </div>
        {/* <!-- Albums --> */}
        <div id="albums" className="p-2">
          <h1 className="text-xl font-lato mb-1 text-white p-1">Albums</h1>
          {/* <!-- Albums div --> */}
          <div id="songs" className="flex flex-wrap space-x-3">
            {/* Albums go here */}
            {albums.map((album) => {
              return (
                <Link key={album.$id} to={`/albums/${album.$id}`}>
                  <AlbumPreview album={album} />
                </Link>
              );
            })}
          </div>
        </div>
        {/* <!-- Playlists --> */}
        <div id="playlists" className="p-2">
          <h1 className="text-xl font-lato mb-1 text-white p-1">Playlists</h1>
          {/* <!-- Playlists div --> */}
          <div id="songs" className="flex flex-wrap space-x-3">
            {/* <!-- Playlist go here --> */}
            {playlists.map((playlist) => {
              return (
                <Link key={playlist.$id} to={`/playlists/${playlist.$id}`}>
                  <PlaylistPreview playlist={playlist} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
