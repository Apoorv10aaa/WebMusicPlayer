import {useState} from 'react';
import databaseService from '../appwrite/database';

export default function SongItem({track,add,playlistId}){
    const [tracks,setTracks]=useState();
    databaseService.getPlaylistTracks(playlistId).then((data)=> setTracks(data));

    function addSong(track){
        setTracks((prevTracks)=>prevTracks.push(track));
        databaseService.updatePlaylist(playlistId,tracks);
    }
    return(
        <div>
            <p>{track.songName}</p>
            {add ? <button onClick={addSong(track)}>Add</button> : null}
        </div>
    )
}