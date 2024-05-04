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
        <div>
            <div id="homePlaylists">
                <span>Playlist</span>
                {playlists.map((playlist)=>(
                    <Link to={`/playlist/${playlist.$id}`} key={playlist.$id}>
                        <PlaylistPreview  playlist={playlist}/>
                    </Link>
                ))}
            </div>
            <div id="homeAlbums">
                <span>Album</span>
                {albums.map((album)=>(
                <Link to={`/albums/${album.$id}`} key={album.$id}>
                    <AlbumPreview album={album}/>
                </Link>
            ))}
            </div>
        </div>
    )
}
export default Home;