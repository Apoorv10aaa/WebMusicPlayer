import { useEffect, useState} from "react";
import databaseService from "../appwrite/database";
import {Link} from 'react-router-dom';

function AlbumsList(){
    const [albums,setAlbums]=useState([]);
    useEffect(()=>{
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
            {albums.map((album)=>(
                <Link to={`/albums/${album.$id}`} key={album.$id}>
                    <div className="flex flex-col h-24 w-24">
                        <img src="#" />
                        <div> {albums.artist}  and {album.tracks.size()} songs</div>
                    </div>
                </Link>
            ))}
        </div>
    )    
}
export default AlbumsList;