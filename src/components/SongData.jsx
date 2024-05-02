import {useParams} from 'react-router-dom';
import databaseService from '../appwrite/database'
import { useEffect, useState } from 'react';

export default function SongData(){
    const {songId}=useParams();
    const [songData,setSongData]=useState();

    useEffect(()=>{
        databaseService.getTrack(songId).then((song)=>{
            setSongData(song);
        });
    })

    // function onPlay(){
    // }
    return(
        <>
            <div>
                <h1>{songData?.name}</h1>
            </div>
        </>
    )
}