import { useCallback, useEffect, useState } from "react";
import elasticsearchService from "../elasticSearch/search";
import SongItem from './SongItem';

export default function Search({add,playlistId}){
    const [query,setQuery]=useState('');
    const [result,setResult]=useState([]);
    // always use result as result._source beacuse this object will have all data of song;
    const handleSearch= useCallback(()=>{
        elasticsearchService.searchTracks(query).then((data)=> setResult(data));
    },[])

    useEffect(()=>{
        handleSearch();
    },[query,handleSearch])

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
        {/* <!-- Search Div --> */}
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
              <div
                className="w-full bg-black bg-opacity-50 rounded-md flex justify-between p-1 px-2 items-center hover:bg-white hover:bg-opacity-10"
              >
                <img
                  src="song4Img.png"
                  alt="SongImg"
                  className="h-8 w-14 rounded-md"
                />
                <h2 className="text-white text-sm font-lato">SongName</h2>
                <p className="text-white text-sm font-lato">Artist</p>
                <p className="text-white text-sm font-lato">Duration</p>
                <svg
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
              <div
                className="w-full bg-black bg-opacity-50 rounded-md flex justify-between p-1 px-2 items-center hover:bg-white hover:bg-opacity-10"
              >
                <img
                  src="song2Img.jpg"
                  alt="SongImg"
                  className="h-8 w-14 rounded-md"
                />
                <h2 className="text-white text-sm font-lato">SongName</h2>
                <p className="text-white text-sm font-lato">Artist</p>
                <p className="text-white text-sm font-lato">Duration</p>
                <svg
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
            </div>
          </div>
        </div>
      </div>

    )
}