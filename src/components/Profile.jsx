import { useSelector } from "react-redux";
import databaseService from "../appwrite/database";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import { Link } from "react-router-dom";
import { PlaylistPreview, LoadingIndicator, SongPreview } from "./index";
import { useEffect, useState } from "react";
import storageService from "../appwrite/bucket";

export default function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();
  console.log("userInfo", userInfo);

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log("here user came");
        const playlists = await databaseService.getPlaylists(userData.$id);
        setUserPlaylists(playlists.documents);
        console.log("here playlists came");
      } catch (error) {
        console.log("Error in Profile fetch", error);
      } finally {
        console.log("ready to load");
        setLoading(false);
      }
    };
    fetch();
  }, [userData]);

  function createPlaylist() {
    const playlistId = ID.unique();
    databaseService
      .addPlaylist({
        playlistId: playlistId,
        createdBy: userData.$id,
      })
      .then(() => navigate(`/playlists/${playlistId}`));
  }

  if (loading) {
    console.log("loading wait....");
    return <LoadingIndicator />;
  }
  return (
    <div id="profile" className="flex-grow flex flex-col px-4">
      {/* <!-- ProfileData --> */}
      <div
        id="profileData"
        className="bg-[#202020] bg-opacity-60 w-full h-44 rounded-md p-2 flex gap-3"
      >
        <img
          src={storageService.getPreview(userInfo.profile)}
          alt="profile"
          className="h-full w-40 rounded-md"
        />
        <div className="inline-block h-full flex-grow relative">
          <h1 className="text-white text-3xl font-lato font-bold">
            {userData.name}
          </h1>
          <p className="text-white text-lg font-lato">{userData.email}</p>
          <div className="absolute bottom-0 w-full flex justify-between">
            <p className="text-white text-md font-lato inline-block">
              {userPlaylists.length} Playlists
            </p>
            <div className="space-x-2">
              <p className="text-white text-lg font-lato inline-block font-bold">
                Create Playlist
              </p>
              <svg
                className="inline-block mb-1 hover:cursor-pointer"
                onClick={createPlaylist}
                fill="#F7941D"
                height="20px"
                width="20px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                enableBackground="new 0 0 512 512"
                xmlSpace="preserve"
              >
                <path
                  d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M405.3,277.3c0,11.8-9.5,21.3-21.3,21.3
                        h-85.3V384c0,11.8-9.5,21.3-21.3,21.3h-42.7c-11.8,0-21.3-9.6-21.3-21.3v-85.3H128c-11.8,0-21.3-9.6-21.3-21.3v-42.7
                        c0-11.8,9.5-21.3,21.3-21.3h85.3V128c0-11.8,9.5-21.3,21.3-21.3h42.7c11.8,0,21.3,9.6,21.3,21.3v85.3H384c11.8,0,21.3,9.6,21.3,21.3
                        V277.3z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Additional --> */}
      <div id="additional" className="flex-grow">
        <div className="flex flex-col p-2 h-full space-y-2">
          {/* <!-- Recents --> */}
          <div id="recents" className="p-2">
            <h1 className="text-xl font-lato mb-1 text-white p-1">Recents</h1>
            {/* <!-- Songs Div --> */}
            <div id="songs" className="flex flex-wrap space-x-3">
              {/* <!-- Song Items go here --> */}
              {userInfo.recents.map((trackId) => {
                return <SongPreview key={trackId} trackId={trackId} />;
              })}
            </div>
          </div>
          {/* <!-- Liked --> */}
          <div id="liked" className="p-2">
            <h1 className="text-xl font-lato mb-1 text-white p-1">Liked</h1>
            {/* <!-- Songs Div --> */}
            <div id="songs" className="flex flex-wrap space-x-3">
              {/* <!-- Song Items go here --> */}
              {userInfo.liked.map((trackId) => {
                return <SongPreview key={trackId} trackId={trackId} />;
              })}
            </div>
          </div>
          {/* <!-- Playlists --> */}
          <div id="playlists" className="p-2">
            <h1 className="text-xl font-lato mb-1 text-white p-1">Playlists</h1>
            {/* <!-- Playlists div --> */}
            <div id="songs" className="flex flex-wrap space-x-3">
              {/* <!-- Playlist go here --> */}
              {userPlaylists.map((playlist) => {
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
    </div>
  );
}
