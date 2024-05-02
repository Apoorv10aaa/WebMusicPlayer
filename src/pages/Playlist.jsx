import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import databaseService from '../appwrite/database'
import SongItem from '../components/index';
import { useSelector } from 'react-redux';
import {useForm} from 'react-hook-form'
import Search from '../components/index';

export default function Playlist(){
    const {playlistId} =useParams();
    const [playlist,setPlaylist]=useState();
    const [tracks,setTracks]=useState([]);
    const user = useSelector((state)=>state.auth.userData);
    const [disabled,setDisabled]=useState(true);
    const {register,handleSubmit}=useForm();
    
    useEffect(()=>{
        databaseService.getPlaylist(playlistId).then((playlist)=>{
            setPlaylist(playlist);
        });
        databaseService.getPlaylistTracks(playlistId).then((tracks)=>{
            setTracks(tracks);
        })
    })

    function editPlaylist(){
        setDisabled(false);
    }

    function updatePlaylist(data){
        data.preventDefault();
        databaseService.updatePlaylist(playlistId,data);
        setDisabled(true);
    }
    //try this if doesnt work then make a playlist slice then update state easily;

    var isAuthor=false;
    if(user.$id===playlist.createdBy) isAuthor=true;
    // everything will be an input with disabled on .
    return(
        <div>
            <h1>Playlist</h1>
            <form onSubmit={handleSubmit(updatePlaylist)}>
                <input value={playlist.name} disabled {...register("name",{required:true})}/>
                <input value={playlist.description} disabled {...register("description",{required:true})} />
                <input value={playlist.createdBy} />
                {!disabled ? (<button type="submit">Done</button>):null}
            </form>
            {tracks.map((track)=>{
                <div key={track.$id}>
                    <SongItem track={track}/>
                </div>
            })}
            {isAuthor ? (<button onClick={editPlaylist()}>Edit Playlist</button>) : null}
            {isAuthor ? (<Search add={true} playlistId={playlistId}/>): null}
        </div>
        // another way can be to send playlist id all the way to SongItem -propdrilling(maybe not good)
    )
}