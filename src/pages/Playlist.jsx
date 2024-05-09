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
        <div
          id="middle-section"
          className="flex-grow flex flex-col rounded-lg gap-4"
        >
          {/* <!-- Premium Div --> */}
          <div id="premium" className="h-16 px-4 ">
            <div
              className="h-full w-full border-b-2 border-zinc-500 flex justify-between items-center rounded-sm"
            >
              {/* <!-- Brand Div --> */}
              <div id="brand" className="flex items-center space-x-1">
                <img src="logo.png" alt="Brand Logo" className="h-14 w-16" />
                <h1 className="text-3xl font-lato text-white font-bold ">Amuse</h1>
              </div>
              {/* <!-- Buttons Div --> */}
              <div id="buttons flex items-center space-x-3">
                <button
                  className="bg-[#DBD4D0] py-1 rounded-3xl text-white w-36 font-lato hover:bg-[#D47A30] hover:shadow-sm hover:shadow-gray-300"
                >
                  Premium
                </button>
                <svg
                  className="inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#DBD4D0"
                  width="35px"
                  height="35px"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* <!-- Playlist Page --> */}
          <div id="playlistPage" className="flex-grow px-4 flex flex-col gap-4">
            {/* <!-- PlaylistsData --> */}
            <div className="h-44 bg-black bg-opacity-50 rounded-md p-2">
              <form onSubmit="" className="flex gap-4 h-full">
                <div id="imageInput" className="h-full relative">
                  <input
                    type="file"
                    id="imageUpload"
                    name="imageUpload"
                    accept="image/*"
                    disabled
                    className="absolute top-0 left-0 cursor-pointer opacity-0 h-full w-full"
                  />
                  <img
                    src="./song4Img.png"
                    alt="Default Image"
                    className="h-full w-48 rounded-md"
                  />
                </div>
                <div className="flex-grow relative pb-2">
                  <input
                    type="text"
                    value="Playlist1Name"
                    disabled
                    className="text-2xl font-lato text-white font-bold bg-transparent"
                  />
                  <input
                    type="text"
                    value="This is Description"
                    disabled
                    className="text-md font-lato text-white bg-transparent"
                  />
                  <div
                    className="w-full absolute bottom-0 flex justify-between pr-4 items-center"
                  >
                    <p className="text-md font-lato text-white inline-block">
                      17 Tracks
                    </p>
                    <div>
                      <svg
                        className="inline-block mr-2"
                        width="30px"
                        height="30px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.9888 4.28491L19.6405 2.93089C18.4045 1.6897 16.4944 1.6897 15.2584 2.93089L13.0112 5.30042L18.7416 11.055L21.1011 8.68547C21.6629 8.1213 22 7.33145 22 6.54161C22 5.75176 21.5506 4.84908 20.9888 4.28491Z"
                          fill="#DBD4D0"
                        />
                        <path
                          d="M16.2697 10.9422L11.7753 6.42877L2.89888 15.3427C2.33708 15.9069 2 16.6968 2 17.5994V21.0973C2 21.5487 2.33708 22 2.89888 22H6.49438C7.2809 22 8.06742 21.6615 8.74157 21.0973L17.618 12.1834L16.2697 10.9422Z"
                          fill="#DBD4D0"
                        />
                      </svg>
                      <svg
                        className="inline-block ml-2"
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
              </form>
            </div>
            {/* <!-- Songlist --> */}
            <div className="flex-grow flex flex-col gap-1">
              {/* <!-- SongItem --> */}
              <SongItem />
            </div>
            {/* <!-- Add Songs (Search Component)--> */}
            <div id="search" className="flex-grow px-4">
              <div className="h-full w-full flex flex-col gap-5">
                {/* <!-- Search Bar --> */}
                <div id="searchBar" className="flex justify-center gap-2">
                  <input
                    type="text"
                    value=""
                    placeholder="Search Your Song,Artist or Genre"
                    className="text-[#424242] text-sm w-80 font-lato bg-[#DBD4D0] rounded-2xl text-center "
                  />
                  <svg
                    className="hover:cursor-pointer"
                    width="30px"
                    height="30px"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    fill="none"
                    stroke="#DBD4D0"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <path d="m11.25 11.25 3 3" />
                    <circle cx="7.5" cy="7.5" r="4.75" />
                  </svg>
                </div>
                {/* <!-- SearchList --> */}
                <div id="searchList" className="flex flex-col gap-2">
                  {/* <!-- SongSearchItem --> */}
                  <SongItem/>
                </div>
              </div>
            </div>
          </div>
        </div>
        // another way can be to send playlist id all the way to SongItem -propdrilling(maybe not good)
    )
}