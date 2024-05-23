import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import databaseService from "../appwrite/database";
import storageService from "../appwrite/bucket";

function Header() {
  const userData = useSelector((state) => state.auth.userData);
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    databaseService
      .getPlaylists(userData.$id)
      .then((data) => setUserPlaylists(data.documents));
  }, []);

  return (
    <div
      id="header"
      className="h-full w-1/5 border-r-2 border-zinc-500 p-2 pr-4 rounded-sm"
    >
      <div className="h-full">
        {/* <!-- First div --> */}
        <div
          id="first"
          className="h-1/3 border-b-2 border-zinc-500 pb-4 flex flex-col gap-1 justify-between"
        >
          {/* <!-- Home --> */}
          <div id="home" className="flex items-center text-white space-x-4">
            <svg
              fill="#DBD4D0"
              width="30px"
              height="30px"
              viewBox="0 0 36 36"
              version="1.1"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <title>home-solid</title>
              <path
                className="clr-i-solid clr-i-solid-path-1"
                d="M33,19a1,1,0,0,1-.71-.29L18,4.41,3.71,18.71a1,1,0,0,1-1.41-1.41l15-15a1,1,0,0,1,1.41,0l15,15A1,1,0,0,1,33,19Z"
              ></path>
              <path
                className="clr-i-solid clr-i-solid-path-2"
                d="M18,7.79,6,19.83V32a2,2,0,0,0,2,2h7V24h6V34h7a2,2,0,0,0,2-2V19.76Z"
              ></path>
              <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
            </svg>
            <Link to={"/home"}>
              <h1 className="text-xl pl-2 font-lato hover:underline">Home</h1>
            </Link>
          </div>
          {/* <!-- Search --> */}
          <div id="search" className="flex items-center text-white space-x-4">
            <svg
              fill="#DBD4D0"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
            </svg>
            <Link to={"/search"}>
              <h1 className="text-xl pl-2 font-lato hover:underline">Search</h1>
            </Link>
          </div>
          {/* <!-- Profile --> */}
          <div id="profile" className="flex items-center text-white space-x-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#DBD4D0"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            <Link to={`/profile/${userData.$id}`}>
              <h1 className="text-xl pl-2 font-lato hover:underline">
                Profile
              </h1>
            </Link>
          </div>
        </div>
        {/* <!-- Second div --> */}
        <div id="second" className="h-2/3 pt-4 flex flex-col space-y-3">
          {/* <!-- Folder --> */}
          <div id="folder" className="flex items-center text-white space-x-4">
            <svg
              width="27px"
              height="27px"
              viewBox="0 0 16 16"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path fill="#DBD4D0" d="M16 15h-16v-11h1l1-2h4l1 2h9z"></path>
            </svg>
            <h1 className="text-xl pl-2 font-lato hover:underline">
              Your Playlists
            </h1>
          </div>
          {/* <!-- Playlists --> */}
          <div id="playlists" className="h-full flex-grow flex flex-col gap-2">
            {userPlaylists.map((playlist) => {
              return (
                <div
                  key={playlist.$id}
                  className="p-2 relative bg-gray-800 bg-opacity-50 rounded-lg hover:bg-white hover:bg-opacity-20"
                >
                  <Link to={`/playlists/${playlist.$id}`}>
                    <div className="flex space-x-2">
                      <img
                        src={storageService.getPreview(playlist.cover)}
                        alt="Song Image"
                        className="h-10 w-16 rounded-sm"
                      />
                      <div id="songDetail">
                        <p className="text-sm text-white font-lato font-bold">
                          {playlist.name}
                        </p>
                        <p className="text-xs text-white font-lato text-wrap">
                          {playlist.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
{
  /**
Home,
Search,
YourLibrary-Playlists,Recents,Favourites,
Account-UserMetaData,
Logout */
}
