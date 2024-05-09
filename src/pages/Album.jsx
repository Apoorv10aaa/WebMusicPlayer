import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import databaseService from '../appwrite/database'
import SongItem from '../components/index';

export default function Album(){
    const {albumId} =useParams();
    const [album,setAlbum]=useState();
    const [tracks,setTracks]=useState([]);

    useEffect(()=>{
        databaseService.getAlbum(albumId).then((album)=>{
            setAlbum(album);
        });
        databaseService.getAlbumTracks(albumId).then((data)=>{
            setTracks(data);
        })
    })
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
          {/* <!-- Album Page --> */}
          <div id="playlistPage" className="flex-grow px-4 flex flex-col gap-4">
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
                  AlbumName
                </h1>
                <p
                  className="text-md font-lato text-white bg-transparent text-wrap"
                >
                  Artists name
                </p>
                <div
                  className="w-full absolute bottom-0 flex justify-between pr-4 items-center"
                >
                  <p className="text-md font-lato text-white inline-block">
                    17 Tracks
                  </p>
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
            {/* <!-- Songlist --> */}
            <div className="flex-grow flex flex-col gap-1">
              {/* <!-- SongItem --> */}
              <SongItem />
            </div>
          </div>
        </div>
    )
}