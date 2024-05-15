import {useSelector} from 'react-redux';
import storageService from '../appwrite/bucket'

export default function SongData(){
    const songData=useSelector((state)=>state.song.songData);
    
    function addLike(){
      // player wala add like krdena paste
    }
    return(
        <div id="right-sidebar" className="w-1/5 p-2">
          <div
            className="bg-[#202020] bg-opacity-50 rounded-md h-full w-full relative"
          >
            {/* <!-- songData --> */}
            <div id="songData" className="p-2">
              <img
                src={storageService.getFile(songData.$id)}
                alt="SongImg"
                className="h-40 w-full rounded-md"
              />
              <div className="mt-2 flex justify-between px-1">
                <h1 className="text-xl font-lato text-white">{songData.songName}</h1>
                <svg
                  className='hover:cursor-pointer'
                  onClick={addLike}
                  width="30px"
                  height="30px"
                  viewBox="0 0 48 48"
                  version="1"
                  xmlns="http://www.w3.org/2000/svg"
                  enableBackground="new 0 0 48 48"
                >
                  <path
                    fill="#F44336"
                    d="M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"
                  />
                </svg>
              </div>
              <p className="text-sm font-lato text-white px-1">{songData.artists[0]}</p>
              <p className="text-sm font-lato text-white px-1 mt-2">
                Album - {songData.albumId}
              </p>
            </div>
          </div>
        </div>
    )
}