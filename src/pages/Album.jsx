import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import databaseService from '../appwrite/database'
import SongItem, { LoadingIndicator } from '../components/index';
import { useDispatch} from 'react-redux';
import {setUI} from '../store/uiSlice'
import {emptyPrev, updateNext} from '../store/playerSlice'
import { updateSong } from '../store/songSlice';

export default function Album(){
    const {albumId} =useParams();
    const [album,setAlbum]=useState();
    const [tracks,setTracks]=useState([]);
    const [loading,setLoading] =useState(true);
    const dispatch=useDispatch();

    useEffect(()=>{
      dispatch(setUI({currentSource:'album',id:albumId,displayAddButton:false}));
        databaseService.getAlbum(albumId).then((album)=>{
            setAlbum(album);
        });
        databaseService.getAlbumTracks(albumId).then((data)=>{
            setTracks(data);
        })
        setLoading(false);
    })

    function playAlbum(){
      dispatch(updateNext(tracks));
      dispatch(emptyPrev());
      dispatch(updateSong(databaseService.getTrack(tracks[0])));
      document.getElementById("audio").play();
    }
    if(loading) return(<LoadingIndicator />);
    return(
          <div id="albumPage" className="flex-grow px-4 flex flex-col gap-4">
            {/* <!-- Album Data --> */}
            <div className="h-44 bg-black bg-opacity-50 rounded-md p-2 flex gap-4">
              {/* <!-- coverImg --> */}
              <img
                src="./song4Img.png"
                alt="Default Image"
                className="h-full w-48 rounded-md"
              />
              {/* <!-- data --> */}
              <div className="flex-grow relative pb-2">
                <h1
                  className="text-2xl font-lato text-white font-bold bg-transparent"
                >
                  {album.albumName}
                </h1>
                <p
                  className="text-md font-lato text-white bg-transparent text-wrap"
                >
                  {album.release}
                </p>
                <div
                  className="w-full absolute bottom-0 flex justify-between pr-4 items-center"
                >
                  <p className="text-md font-lato text-white inline-block">
                    {tracks.length} Tracks
                  </p>
                  <svg
                    className="inline-block ml-2 hover:cursor-pointer"
                    onClick={playAlbum}
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
                </div>
              </div>
            </div>
            {/* <!-- Songlist --> */}
            <div className="flex-grow flex flex-col gap-1">
              {/* <!-- SongItem --> */}
              {tracks.map((trackId)=>{
                return (<div key={trackId}><SongItem trackId={trackId}/></div>)
              })}
            </div>
          </div>
    )
}