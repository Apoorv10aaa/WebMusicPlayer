import { useEffect } from "react";
import databaseService from "../appwrite/database";
import storageService from "../appwrite/bucket";

export default function SongPreview(trackId){
  var track=null;
  useEffect(()=>{
    databaseService.getTrack(trackId).then((data)=>track=data);
  })
    return(
        <div className="songItem p-2 relative bg-black bg-opacity-50 rounded-lg hover:bg-white hover:bg-opacity-10">
          <div className="flex flex-col justify-between space-y-2">
            <img
              src={storageService.getFile(trackId)}
              alt="Song Image"
              className="h-28 w-32 rounded-lg"
            />
            <div id="songDetail">
              <p className="text-sm text-white font-lato font-bold">
                {track.songName}
              </p>
              <p className="text-xs text-white font-lato">{track.artist[0]}</p>
            </div>
          </div>
        </div>
    )
}