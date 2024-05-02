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
        <div>
            <h1>Album</h1>
            <h2>{album.name}</h2>
            {tracks.map((track)=>{
                <div key={track.$id}>
                    <SongItem track={track}/>
                </div>
            })}
        </div>
    )
}