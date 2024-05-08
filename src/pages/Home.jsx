import { useEffect, useState} from "react";
import databaseService from "../appwrite/database";
import {Link} from 'react-router-dom';
import PlaylistPreview from '../components/index'
import AlbumPreview from "../components/index";

function Home(){
    const [playlists,setPlaylists]=useState([]);
    const [albums,setAlbums]=useState([]);
    useEffect(()=>{
        databaseService.getPlaylists().then(
            (playlists)=>{
                if(playlists){
                    setPlaylists(playlists.documents);
                }
            }
        );
        databaseService.getAlbums().then(
            (albums)=>{
                if(albums){
                    setAlbums(albums.documents);
                }
            }
        );

    },[]);

    return(
        <div id="middle-section" className="flex-grow flex flex-col rounded-lg">
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
          {/* <!-- Home Div --> */}
          <div id="home" className="flex-grow">
            {/* <!-- Nested flex container --> */}
            <div className="flex flex-col p-2 h-full space-y-2">
              {/* <!-- Recents --> */}
              <div id="recents" className="p-2">
                <h1 className="text-xl font-lato mb-1 text-white p-1">Recents</h1>
                {/* <!-- Songs Div --> */}
                <div id="songs" className="flex flex-wrap space-x-3">
                  {/* <!-- Song Items go here --> */}
                  <div
                    className="songItem p-2 relative bg-black bg-opacity-50 rounded-lg hover:bg-white hover:bg-opacity-10"
                  >
                    <div className="flex flex-col justify-between space-y-2">
                      <img
                        src="./song2Img.jpg"
                        alt="Song Image"
                        className="h-28 w-32 rounded-lg"
                      />
                      <div id="songDetail">
                        <p className="text-sm text-white font-lato font-bold">
                          Song1Name
                        </p>
                        <p className="text-xs text-white font-lato">Artist Name</p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- song2 --> */}
                  <div
                    className="songItem p-2 relative bg-black bg-opacity-50 rounded-lg hover:bg-white hover:bg-opacity-10"
                  >
                    <div className="flex flex-col justify-between space-y-2">
                      <img
                        src="./songImg.jpg"
                        alt="Song Image"
                        className="h-28 w-32 rounded-lg"
                      />
                      <div id="songDetail">
                        <p className="text-sm text-white font-lato font-bold">
                          Song2Name
                        </p>
                        <p className="text-xs text-white font-lato">Artist Name</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Albums --> */}
              <div id="albums" className="p-2">
                <h1 className="text-xl font-lato mb-1 text-white p-1">Albums</h1>
                {/* <!-- Albums div --> */}
                <div id="songs" className="flex flex-wrap space-x-3">
                  {/* Albums go here */}
                  <div
                    className="p-2 relative bg-black bg-opacity-50 rounded-lg hover:bg-white hover:bg-opacity-10"
                  >
                    <div className="flex flex-col justify-between space-y-2">
                      <img
                        src="./song2Img.jpg"
                        alt="Song Image"
                        className="h-28 w-32 rounded-lg"
                      />
                      <div id="songDetail">
                        <p className="text-sm text-white font-lato font-bold">
                          Album1Name
                        </p>
                        <p className="text-xs text-white font-lato text-wrap">
                          Artists Name
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- album2 --> */}
                  <div
                    className="p-2 relative bg-black bg-opacity-50 rounded-lg hover:bg-white hover:bg-opacity-10"
                  >
                    <div className="flex flex-col justify-between space-y-2">
                      <img
                        src="./songImg.jpg"
                        alt="Song Image"
                        className="h-28 w-32 rounded-lg"
                      />
                      <div id="songDetail">
                        <p className="text-sm text-white font-lato font-bold">
                          Album2Name
                        </p>
                        <p className="text-xs text-white font-lato text-wrap">
                          Artists Name
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Playlists --> */}
              <div id="playlists" className="p-2">
                <h1 className="text-xl font-lato mb-1 text-white p-1">Playlists</h1>
                {/* <!-- Playlists div --> */}
                <div id="songs" className="flex flex-wrap space-x-3">
                  {/* <!-- Playlist go here --> */}
                  <div
                    className="p-2 relative bg-black bg-opacity-50 rounded-lg hover:bg-white hover:bg-opacity-10"
                  >
                    <div className="flex flex-col justify-between space-y-2">
                      <img
                        src="./song2Img.jpg"
                        alt="Song Image"
                        className="h-28 w-32 rounded-lg"
                      />
                      <div id="songDetail">
                        <p className="text-sm text-white font-lato font-bold">
                          Playlist1Name
                        </p>
                        <p className="text-xs text-white font-lato text-wrap">
                          Description
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Playlist2 --> */}
                  <div
                    className="p-2 relative bg-black bg-opacity-50 rounded-lg hover:bg-white hover:bg-opacity-10"
                  >
                    <div className="flex flex-col justify-between space-y-2">
                      <img
                        src="./songImg.jpg"
                        alt="Song Image"
                        className="h-28 w-32 rounded-lg"
                      />
                      <div id="songDetail">
                        <p className="text-sm text-white font-lato font-bold">
                          Playlist2Name
                        </p>
                        <p className="text-xs text-white font-lato text-wrap">
                          Description
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}
export default Home;