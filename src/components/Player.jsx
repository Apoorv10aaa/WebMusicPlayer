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
    const [volume,setVolume]=useState(1);
    var progressInterval;

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
        if(!isPlaying){
            audioRef.current.play();
            progressInterval = setInterval(updateProgress, 100);
        }
        else{
            audioRef.current.pause();
            clearInterval(progressInterval);
        }
    }
    const progress=document.getElementById("progress");

    function updateProgress(){
        const currentTime = audioRef.currentTime;
        const duration = audioRef.duration;
        const percentage = (currentTime / duration) * 100;
        progress.style.width = percentage + '%';
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
        <div id="footer" className="h-1/5 w-full p-2">
            <div className="h-full bg-[#202020] bg-opacity-50 rounded-md p-2">
            {/* <!-- Tracker --> */}
            <div id="tracker" className="h-1/5 place-content-center mb-1">
                <div id="progressBar" className="w-full h-1 rounded-lg bg-[#DBD4D0]">
                <div id="progress" className="rounded-lg"></div>
                </div>
            </div>
            {/* <!-- Player --> */}
            <div id="player" className="h-4/5 flex items-center px-2">
                <div id="song" className="text-white flex items-center px-2 w-5/12">
                {/* <!-- Song image --> */}
                <img
                    src="./songImg.jpg"
                    alt="Song Image"
                    className="h-14 w-18 mr-2 rounded-sm"
                />
                {/* <!-- Song details --> */}
                <div>
                    <h1 className="text-xl font-lato">SongName</h1>
                    <p className="text-sm fotn-lato">Arijit Singh</p>
                </div>
                </div>
                <div className="flex justify-between flex-grow">
                {/* <!-- Player controls --> */}
                <div id="controls" className="flex items-center space-x-4">
                    {/* <!-- SVG Icons --> */}
                    <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M20.2409 7.21957V16.7896C20.2409 18.7496 18.1109 19.9796 16.4109 18.9996L12.2609 16.6096L8.11094 14.2096C6.41094 13.2296 6.41094 10.7796 8.11094 9.79957L12.2609 7.39957L16.4109 5.00957C18.1109 4.02957 20.2409 5.24957 20.2409 7.21957Z"
                        fill="#DBD4D0"
                    />
                    <path
                        d="M3.76172 18.9303C3.35172 18.9303 3.01172 18.5903 3.01172 18.1803V5.82031C3.01172 5.41031 3.35172 5.07031 3.76172 5.07031C4.17172 5.07031 4.51172 5.41031 4.51172 5.82031V18.1803C4.51172 18.5903 4.17172 18.9303 3.76172 18.9303Z"
                        fill="#DBD4D0"
                    />
                    </svg>
                    <svg
                    fill="#DBD4D0"
                    width="30px"
                    height="30px"
                    viewBox="0 0 512 512"
                    id="_23_Play"
                    data-name="23 Play"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        id="Path_30"
                        data-name="Path 30"
                        d="M256,512C114.625,512,0,397.375,0,256,0,114.609,114.625,0,256,0S512,114.609,512,256C512,397.375,397.375,512,256,512Zm0-448C149.969,64,64,149.969,64,256s85.969,192,192,192,192-85.969,192-192S362.031,64,256,64Zm-64,96,160,96L192,352Z"
                        fillRule="evenodd"
                    />
                    </svg>
                    <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M3.76172 7.21957V16.7896C3.76172 18.7496 5.89172 19.9796 7.59172 18.9996L11.7417 16.6096L15.8917 14.2096C17.5917 13.2296 17.5917 10.7796 15.8917 9.79957L11.7417 7.39957L7.59172 5.00957C5.89172 4.02957 3.76172 5.24957 3.76172 7.21957Z"
                        fill="#DBD4D0"
                    />
                    <path
                        d="M20.2383 18.9303C19.8283 18.9303 19.4883 18.5903 19.4883 18.1803V5.82031C19.4883 5.41031 19.8283 5.07031 20.2383 5.07031C20.6483 5.07031 20.9883 5.41031 20.9883 5.82031V18.1803C20.9883 18.5903 20.6583 18.9303 20.2383 18.9303Z"
                        fill="#DBD4D0"
                    />
                    </svg>
                </div>
                {/* <!-- Volume Control --> */}
                <div id="volume-control" className="flex items-center space-x-2">
                    <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path d="M6 1H8V15H6L2 11H0V5H2L6 1Z" fill="#DBD4D0" />
                    <path
                        d="M14 8C14 5.79086 12.2091 4 10 4V2C13.3137 2 16 4.68629 16 8C16 11.3137 13.3137 14 10 14V12C12.2091 12 14 10.2091 14 8Z"
                        fill="#DBD4D0"
                    />
                    <path
                        d="M12 8C12 9.10457 11.1046 10 10 10V6C11.1046 6 12 6.89543 12 8Z"
                        fill="#DBD4D0"
                    />
                    </svg>
                    <input type="range" min="1" max="100" className="w-24" value="40" />
                </div>
                {/* <!-- Like button --> */}
                <svg
                    width="30px"
                    height="30px"
                    viewBox="0 0 48 48"
                    version="1"
                    xmlns="http://www.w3.org/2000/svg"
                    enableBackground="new 0 0 48 48"
                    >
                    <path
                    fill="#F44336"
                    d="M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"
                    />
                </svg>
                {/* <!-- Replay  --> */}
                <div id="replay-duration" className="flex items-center space-x-2">
                    <svg
                    fill="#DBD4D0"
                    width="30px"
                    height="30px"
                    viewBox="-24 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <title>replay</title>
                    <path
                        d="M232 448Q186 448 148 425 109 402 87 363 64 324 64 278L64 256 112 256 112 280Q112 331 147 366 182 400 233 400 265 400 293 384 320 367 336 340 352 313 352 281 352 230 318 195 283 160 232 160L232 232 136 136 232 40 232 112Q279 112 317 134 355 157 378 196 400 234 400 280 400 327 378 364 356 403 317 426 277 448 232 448Z"
                    />
                    </svg>
                </div>
                {/* <!-- Duration --> */}
                <div><span className="text-xl font-lato text-white">3.45</span></div>
                </div>
            </div>
            </div>
        </div>
    )

}