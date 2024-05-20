import {useSelector,useDispatch} from 'react-redux';
import { useEffect, useState ,useRef} from 'react';
// import databaseService from '../appwrite/database';
import storageService from '../appwrite/bucket';
import {playPause,updatePrev} from '../store/playerSlice';
// import {updateUserData} from '../store/authSlice'

export default function Player(){
    const audioRef=useRef(null);
    const dispatch=useDispatch();
    // const userData=useSelector((state)=>state.auth.userData);
    const songId=useSelector((state)=> state.song.songId);
    const isPlaying=useSelector((state)=>state.player.isPlaying);
    const songData=useSelector((state)=>state.song.songData);
    const [track,setTrack]=useState(null);
    const next=useSelector((state)=>state.player.next);
    const prev=useSelector((state)=>state.player.prev);
    var volume=100;
    var progressInterval;
    var cover=null;

    useEffect(()=>{
        storageService.getFile(songId).then((track)=>{
            if(track) setTrack(track);
            else track=null;
        });
        storageService.getFile(songData.cover).then((data)=>(cover=data));
    },[songId]);

    function togglePlayPause(){
        if(!isPlaying){
            audioRef.current.play();
            progressInterval = setInterval(updateProgress, 100);
        }
        else{
            audioRef.current.pause();
            clearInterval(progressInterval);
        }
        dispatch(playPause());
    }
    const progress=document.getElementById("progress");

    function updateProgress(){
        const currentTime = audioRef.currentTime;
        const duration = audioRef.duration;
        const percentage = (currentTime / duration) * 100;
        progress.style.width = percentage + '%';
    }
    
    function nextSong(){
        // depends on where user is, wants to play next album song or next playlist song
        prev.push(track);
        dispatch(updatePrev(prev));
        setTrack(()=>{
            var index=Math.floor(Math.random()*next.length)+1;
            return next[index];
        })
        togglePlayPause();
    }
    function prevSong(){
        if(prev.length>0){
            setTrack(prev[prev.length-1]);
            prev.pop();
            dispatch(updatePrev(prev));
        }
    }
    // baad m krta hun
    // var likedSongs=userData.liked;
    // function addLike(){
    //     likedSongs.push(track);
    //     databaseService.updateUserProfile({liked:likedSongs});
    //     //idhr krne h changes
    //     dispatch(updateUserData())
    // }
    function replay(){
        audioRef.current.play();
    }
    function volumeUpDown(e){
        volume=e.target.value;
        audioRef.current.volume=volume;
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
                <audio
                ref={audioRef}
                id="audio"
                src={track}
                ></audio>
                <div id="song" className="text-white flex items-center px-2 w-5/12">
                {/* <!-- Song image --> */}
                <img
                    src={cover}
                    alt="Song Image"
                    className="h-14 w-18 mr-2 rounded-sm hover:cursor-pointer hover:shadow-gray-100 hover:shadow-sm"
                />
                {/* <!-- Song details --> */}
                <div>
                    <h1 className="text-xl font-lato hover:underline">{songData.songName}</h1>
                    <p className="text-sm fotn-lato">{songData.artists.map((artist,index)=>(<span key={index}>{artist},</span>))}</p>
                </div>
                </div>
                <div className="flex justify-between flex-grow">
                {/* <!-- Player controls --> */}
                <div id="controls" className="flex items-center space-x-4">
                    {/* <!-- SVG Icons --> */}
                    {/* prev */}
                    <svg
                    className='hover:cursor-pointer'
                    onClick={prevSong}
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
                    {/* play */}
                    {isPlaying ? 
                    ( <svg fill="#DBD4D0"
                        onClick={togglePlayPause}
                        className='hover:cursor-pointer'
                        width="30px"
                        height="30px"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <g
                            id="Group_22"
                            data-name="Group 22"
                            transform="translate(-670.002 -321.695)"
                        >
                            <path
                            id="Path_360"
                            data-name="Path 360"
                            d="M686,353.7a16,16,0,1,0-16-16A16,16,0,0,0,686,353.7Zm0-28a12,12,0,1,1-12,12A12,12,0,0,1,686,325.7Z"
                            />
                            <rect
                            id="Rectangle_32"
                            data-name="Rectangle 32"
                            width="3"
                            height="9.999"
                            transform="translate(681.002 332.696)"
                            />
                            <rect
                            id="Rectangle_33"
                            data-name="Rectangle 33"
                            width="3"
                            height="9.999"
                            transform="translate(688.002 332.696)"
                            />
                        </g>
                        </svg>):( <svg
                        className='hover:cursor-pointer'
                        onClick={togglePlayPause}
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
                        </svg>)}
                    {/* next */}
                    <svg
                    className='hover:cursor-pointer'
                    onClick={nextSong}
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
                    <input type="range" min="1" max="100" className="w-24 hover:cursor-pointer" value={volume} onChange={volumeUpDown}/>
                </div>
                {/* <!-- Like button --> */}
                <svg
                    className='hover:cursor-pointer'
                    // onClick={addLike}
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
                <div id="replay" className="flex items-center space-x-2">
                    <svg
                    className='hover:cursor-pointer'
                    onClick={replay}
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
                <div><span className="text-xl font-lato text-white">{audioRef.current.duration/60} min</span></div>
                </div>
            </div>
            </div>
        </div>
    )

}