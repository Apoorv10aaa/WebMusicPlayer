import { useCallback, useEffect, useState } from "react";
import elasticsearchService from "../elasticSearch/search";
import SongItem from './SongItem';

export default function Search({add,playlistId}){
    const [query,setQuery]=useState('');
    const [result,setResult]=useState([]);

    const handleSearch= useCallback(()=>{
        elasticsearchService.searchTracks(query).then((data)=> setResult(data));
    },[])

    useEffect(()=>{
        handleSearch();
    },[query,handleSearch])

    return(
        <div>
            Search here: <br/>
            <input value={query} onChange={(e)=>(setQuery(e.target.value))}/>
            <button onClick={handleSearch}>Search</button>
            <ul>
            {result.map((track) => (
            <li key={track.$id}>
                <SongItem track={track} add={add} playlistId={playlistId}/>
            </li>
            ))}
      </ul>
        </div>
    )
}