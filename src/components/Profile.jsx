import {useSelector} from 'react-redux';
import databaseService from '../appwrite/database';
import {useNavigate} from 'react-router-dom';
import { ID } from 'appwrite';
import { Link } from 'react-router-dom';
import PlaylistPreview from './index';
import SongPreview from './index';

export default function Profile(){
    const userData=useSelector((state)=> state.auth.userData);
    const recents=userData.recents;
    const liked=userData.liked;
    const userPlaylists=databaseService.getPlaylists(userData.$id);
    const navigate=useNavigate();

    function createPlaylist(){
        const playlistId=ID.unique();
        databaseService.addPlaylist(playlistId);
        navigate(`/plalist/${playlistId}`)
    }

    return (
        <div
          id="middle-section"
          className="flex-grow flex flex-col rounded-lg gap-4"
        >
          {/* <!-- Premium Div --> */}
          <div id="premium" className="h-16 px-4 ">
            <div
              className="h-full w-full border-b-2 border-zinc-500 flex justify-between items-center rounded-sm"
            >
              {/* <!-- Brand Div --> */}
              <div id="brand" className="flex items-center space-x-1">
                <img src="logo.png" alt="Brand Logo" className="h-14 w-16" />
                <h1 className="text-3xl font-lato text-white font-bold ">Amuse</h1>
              </div>
              {/* <!-- Buttons Div --> */}
              <div id="buttons flex items-center space-x-3">
                <button
                  className="bg-[#DBD4D0] py-1 rounded-3xl text-white w-36 font-lato hover:bg-[#D47A30] hover:shadow-sm hover:shadow-gray-300"
                >
                  Premium
                </button>
                <svg
                  className="inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#DBD4D0"
                  width="35px"
                  height="35px"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* <!-- Profile Div --> */}
          <div id="profile" className="flex-grow flex flex-col px-4">
            {/* <!-- ProfileData --> */}
            <div
              id="profileData"
              className="bg-black bg-opacity-50 w-full h-44 rounded-md p-2 flex gap-3"
            >
              <img
                src="./profile.JPG"
                alt="profile"
                className="h-full w-40 rounded-md"
              />
              <div className="inline-block h-full flex-grow relative">
                <h1 className="text-white text-3xl font-lato font-bold">
                  Apoorv10aaa
                </h1>
                <p className="text-white text-lg font-lato">
                  apoorvsrivastava@gmail.com
                </p>
                <div className="absolute bottom-0 w-full">
                  <p className="text-white text-md font-lato inline-block">
                    3 Playlists
                  </p>
                  <p
                    className="text-white text-md font-lato inline-block absolute right-8 font-bold "
                  >
                    Create Playlist
                    <svg
                      className="inline-block mb-1 hover:cursor-pointer"
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
                  </p>
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
                    <SongPreview />
                  </div>
                </div>
                {/* <!-- Liked --> */}
                <div id="liked" className="p-2">
                  <h1 className="text-xl font-lato mb-1 text-white p-1">Liked</h1>
                  {/* <!-- Songs Div --> */}
                  <div id="songs" className="flex flex-wrap space-x-3">
                    {/* <!-- Song Items go here --> */}
                    <SongPreview />
                  </div>
                </div>
                {/* <!-- Playlists --> */}
                <div id="playlists" className="p-2">
                  <h1 className="text-xl font-lato mb-1 text-white p-1">
                    Playlists
                  </h1>
                  {/* <!-- Playlists div --> */}
                  <div id="songs" className="flex flex-wrap space-x-3">
                    {/* <!-- Playlist go here --> */}
                    <PlaylistPreview />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}