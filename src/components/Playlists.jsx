import { useEffect, useState} from "react";
import databaseService from "../appwrite/database";
import {Link} from 'react-router-dom';

function PlaylistList(){
    const [playlists,setPlaylists]=useState([]);
    useEffect(()=>{
        databaseService.getPlaylists().then(
            (playlists)=>{
                if(playlists){
                    setPlaylists(playlists.documents);
                }
            }
        );
    },[]);

    return(
        <div>
            {playlists.map((playlist)=>(
                <Link to={`/playlists/${playlist.$id}`} key={playlist.$id}>
                    <div className="flex flex-col h-24 w-24">
                        <img src="#" />
                        <div> {playlist.artist}  and {playlist.tracks.size()} songs</div>
                    </div>
                </Link>
            ))}
        </div>
    )    
}
export default PlaylistList;