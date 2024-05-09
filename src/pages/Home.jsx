import { useEffect, useState} from "react";
import databaseService from "../appwrite/database";
import {Link} from 'react-router-dom';
import PlaylistPreview, { LoadingIndicator } from '../components/index'
import AlbumPreview from "../components/index";
import SongPreview from "../components/index";

function Home(){
    const [playlists,setPlaylists]=useState([]);
    const [albums,setAlbums]=useState([]);
    const [loading,setLoading] =useState(true);

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
        setLoading(false);
    },[]);
    
    if(loading) return(<LoadingIndicator />);
    return(
          <div id="home" className="flex-grow">
            {/* <!-- Nested flex container --> */}
            <div className="flex flex-col p-2 h-full space-y-2">
              {/* <!-- Recents --> */}
              <div id="recents" className="p-2">
                <h1 className="text-xl font-lato mb-1 text-white p-1">Recents</h1>
                {/* <!-- Songs Div --> */}
                <div id="songs" className="flex flex-wrap space-x-3">
                  {/* <!-- Song Items go here --> */}
                  <SongPreview />
                  <SongPreview />
                </div>
              </div>
              {/* <!-- Albums --> */}
              <div id="albums" className="p-2">
                <h1 className="text-xl font-lato mb-1 text-white p-1">Albums</h1>
                {/* <!-- Albums div --> */}
                <div id="songs" className="flex flex-wrap space-x-3">
                  {/* Albums go here */}
                  <AlbumPreview />
                  <AlbumPreview />
                </div>
              </div>
              {/* <!-- Playlists --> */}
              <div id="playlists" className="p-2">
                <h1 className="text-xl font-lato mb-1 text-white p-1">Playlists</h1>
                {/* <!-- Playlists div --> */}
                <div id="songs" className="flex flex-wrap space-x-3">
                  {/* <!-- Playlist go here --> */}
                  <PlaylistPreview />
                  <PlaylistPreview />
                </div>
              </div>
            </div>
          </div>
    )
}
export default Home;