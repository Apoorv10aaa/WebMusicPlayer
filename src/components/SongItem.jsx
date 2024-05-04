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
        <div>
            <Link>
                <img src={track.cover} alt={track.songName} />
                <p>{track.songName}</p>
            </Link>
            {add ? <button onClick={addSong(track)}>Add</button> : null}
        </div>
    )
}