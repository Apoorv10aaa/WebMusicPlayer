import {useSelector,useDispatch} from 'react-redux';
import { useEffect, useState ,useRef} from 'react';
import {Link} from 'react-router-dom';
import databaseService from '../appwrite/database';
import storageService from '../appwrite/bucket';
import {playPause,volumeCntrl,playNext,playPrev} from '../store/playerSlice';
import { updateSong } from '../store/songSlice';

export default function Player(){
    const audioRef=useRef(null);
    const dispatch=useDispatch();

    const songId=useSelector((state)=> state.song.songId);
    const isPlaying=useSelector((state)=>state.player.isPlaying);
    const songData=useSelector((state)=>state.song.songData);
    const [track,setTrack]=useState(null);

    useEffect(()=>{
        storageService.getFile(songId).then((track)=>{
            if(track) setTrack(track);
            else track=null;
        });
    },[songId]);

    const [clickable,setClickable]=useState(false);
    if(songId) setClickable(true);

    function togglePlayPause(){
        dispatch(playPause());
        if(isPlaying) audioRef.current.play();
        else audioRef.current.pause();
    }
    useEffect(()=>{
        dispatch(playPause());
        audioRef.current.pause();
        audioRef.current.load();
    },[track,dispatch]);
    
    function nextSong(){
        databaseService.getRandom().then((songId)=>{
            dispatch(updateSong(songId));
            dispatch(playNext());
        });
    }
    const prev=useSelector((state)=>state.player.prev);
    function prevSong(){
        databaseService.getTrack(prev[prev.size()-1]).then((trackData)=> dispatch(updateSong(trackData)));
        dispatch(playPrev());
    }

    function volumeUpDown(e){
        const volume=e.target.value;
        dispatch(volumeCntrl(volume));
    }

    

    return(
        <div>
            <audio ref={audioRef} src={track} preload="auto" />
            <button onClick={togglePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    )

}