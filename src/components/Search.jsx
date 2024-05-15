import { useState } from "react";
import elasticsearchService from "../elasticSearch/search";
import SongItem from './SongItem';

export default function Search(){
    const [query,setQuery]=useState('');
    const [result,setResult]=useState([]);
    // always use result as result._source beacuse this object will have all data of song;

    const handleSearch=()=>{
        elasticsearchService.searchTracks(query).then((data)=> setResult(data));
        setQuery("");
    }

    return(
        <div id="search" className="flex-grow px-4">
          <div className="h-full w-full flex flex-col gap-5">
            {/* <!-- Search Bar --> */}
            <div id="searchBar" className="flex justify-center gap-2">
              <input
                type="text"
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
                placeholder="Search Your Song,Artist or Genre"
                className="text-[#424242] text-sm w-80 font-lato bg-[#DBD4D0] rounded-2xl text-center "
              />
              <svg
                className="hover:cursor-pointer"
                onClick={handleSearch}
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
              {result.map((song)=>{
                return(
                  <SongItem key={song._id} trackId={song._id} />
                )
              })}
            </div>
          </div>
        </div>

    )
}