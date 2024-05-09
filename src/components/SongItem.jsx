import {useState} from 'react';
import databaseService from '../appwrite/database';
import {Link} from 'react-router-dom';

export default function SongItem({track,add,playlistId}){
    const [tracks,setTracks]=useState();
    databaseService.getPlaylistTracks(playlistId).then((data)=> setTracks(data));

    function addSong(track){
        setTracks((prevTracks)=>prevTracks.push(track));
        databaseService.updatePlaylist(playlistId,tracks);
    }
    return(
        <div className="w-full bg-black bg-opacity-50 rounded-md flex justify-between p-1 px-2 items-center hover:bg-white hover:bg-opacity-10">
            <img
                src="song4Img.png"
                alt="SongImg"
                className="h-8 w-14 rounded-md"
            />
            <h2 className="text-white text-sm font-lato">SongName</h2>
            <p className="text-white text-sm font-lato">Artist</p>
            <p className="text-white text-sm font-lato">Duration</p>
            <svg
                fill="#F7941D"
                width="30px"
                height="30px"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g
                id="Group_26"
                data-name="Group 26"
                transform="translate(-526 -249.561)"
                >
                <path
                    id="Path_346"
                    data-name="Path 346"
                    d="M542,249.561a16,16,0,1,0,16,16A16,16,0,0,0,542,249.561Zm0,28a12,12,0,1,1,12-12A12,12,0,0,1,542,277.561Z"
                />
                <path
                    id="Path_348"
                    data-name="Path 348"
                    d="M540,271.561v-6h7Z"
                />
                <path
                    id="Path_349"
                    data-name="Path 349"
                    d="M540,259.561v6h7Z"
                />
                </g>
            </svg>
        </div>
    )
}