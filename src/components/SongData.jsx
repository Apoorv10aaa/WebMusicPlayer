import { useDispatch, useSelector } from "react-redux";
import storageService from "../appwrite/bucket";
import { updateUserInfo } from "../store/authSlice";
import databaseService from "../appwrite/database";

export default function SongData() {
  const songData = useSelector((state) => state.song.songData);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  async function addLike() {
    if (!userInfo.liked.includes(songData.$id)) {
      const user = await databaseService.updateUserProfile(userInfo.$id, {
        ...userInfo,
        liked: [...userInfo.liked, songData.$id],
      });
      dispatch(updateUserInfo(user));
    }
  }
  return (
    <div id="right-sidebar" className="w-1/5 p-2">
      <div className="bg-[#202020] bg-opacity-50 rounded-md h-full w-full relative">
        {/* <!-- songData --> */}
        <div id="songData" className="p-2">
          <img
            src={storageService.getPreview(songData.cover)}
            alt="SongImg"
            className="h-40 w-full rounded-md"
          />
          <div className="mt-2 flex justify-between px-1">
            <h1 className="text-xl font-lato text-white">
              {songData.songName}
            </h1>
            <svg
              className="hover:cursor-pointer"
              onClick={addLike}
              width="25px"
              height="25px"
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
          <p className="text-sm font-lato text-white px-1">
            {songData.artists}
          </p>
          <p className="text-sm font-lato text-white px-1 mt-2">
            Album - {songData.albumName}
          </p>
        </div>
      </div>
    </div>
  );
}
