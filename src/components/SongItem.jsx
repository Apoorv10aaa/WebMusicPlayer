import databaseService from '../appwrite/database';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import storageService from '../appwrite/bucket';
import { updateSong } from '../store/songSlice';
import {emptyPrev, updateNext} from '../store/playerSlice'

export default function SongItem({track}){
    const displayAddButton =useSelector((state)=> state.ui.displayAddButton);
    const dispatch=useDispatch();
    const currentSource=useSelector((state=>state.ui.currentSource));
    const id=useSelector((state=>state.ui.id));
    var tracks=[];
    var {playlistId}=useParams();

    function addSong(track){
        databaseService.getPlaylistTracks(playlistId).then((data)=> tracks=data);
        tracks.push(track);
        databaseService.updatePlaylist(playlistId,tracks);
    }

    function playSong(){
        dispatch(updateSong(track));
        document.getElementById("audio").play();     
        if(currentSource=='playlist'){
            databaseService.getPlaylistTracks(id).then((data)=>dispatch(updateNext({next:data})));
        }
        else if(currentSource=='album'){
            databaseService.getAlbumTracks(id).then((data)=>dispatch(updateNext({next:data})));
        }
        else{
            databaseService.getAlbumTracks(track.albumId).then((data)=>dispatch(updateNext({next:data})));
        }
        dispatch(emptyPrev());
    }
    return(
        <div className="w-full bg-black bg-opacity-50 rounded-md flex justify-between p-1 px-2 items-center hover:bg-white hover:bg-opacity-10">
            <img
                src={storageService.getFile(track.cover)}
                alt="SongImg"
                className="h-8 w-14 rounded-md"
            />
            <h2 className="text-white text-sm font-lato">{track.songName}</h2>
            <p className="text-white text-sm font-lato">{track.artists.map((artist)=>artist,",")}</p>
            <p className="text-white text-sm font-lato">{track.duration}</p>
            {displayAddButton && (<svg className='hover:cursor-pointer'
                onClick={()=>addSong(track)}
                fill="#DBD4D0" width="30px" height="30px" viewBox="0 0 512 512" id="_14_Add" data-name="14 Add" xmlns="http://www.w3.org/2000/svg">
                <path id="Path_19" data-name="Path 19" d="M256,512C114.625,512,0,397.391,0,256S114.625,0,256,0C397.391,0,512,114.609,512,256S397.391,512,256,512Zm0-448C149.969,64,64,149.969,64,256s85.969,192,192,192c106.047,0,192-85.969,192-192S362.047,64,256,64Zm32,320H224V288H128V224h96V128h64v96h96v64H288Z" fill-rule="evenodd"/>
                </svg>)}
            <svg
                className='hover:cursor-pointer'
                onClick={playSong}
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