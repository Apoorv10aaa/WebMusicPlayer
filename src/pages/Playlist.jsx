import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/database";
import { SongItem, LoadingIndicator, Search } from "../components/index";
import { useDispatch, useSelector } from "react-redux";
// import { useForm } from "react-hook-form";
import { setUI } from "../store/uiSlice";
import storageService from "../appwrite/bucket";
import { updateSong } from "../store/songSlice";
// import { emptyPrev, updateNext } from "../store/playerSlice";
// import { login } from "../store/authSlice";

export default function Playlist() {
  const { slug } = useParams();
  const [playlist, setPlaylist] = useState();
  const user = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  var isAuthor = false;

  useEffect(() => {
    dispatch(
      setUI({
        currentSource: "playlist",
        id: slug,
        displayAddButton: true,
      })
    );
    const fetch = async () => {
      try {
        const playlist = await databaseService.getPlaylist(slug);
        setPlaylist(playlist);
        setPlaylistName(playlist.name);
        setPlaylistDescription(playlist.description);
      } catch (error) {
        console.log("Error in playlist fetch", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [dispatch, slug, playlist]);

  async function updatePlaylist(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const file = await storageService.addFile(e.target[0].files[0]);
      const playlist = await databaseService.updatePlaylist(slug, {
        name: e.target[1].value,
        description: e.target[2].value,
        cover: file.$id,
      });
      console.log("newPlaylistData", playlist);
      setPlaylist(playlist);
      setEditing(false);
    } catch (error) {
      console.log("Error in updating playlist", error);
    }
  }
  function playPlaylist() {
    databaseService
      .getTrack(playlist.tracks[0])
      .then((data) => dispatch(updateSong(data)));
  }
  //try this if doesnt work then make a playlist slice then update state easily;

  // everything will be an input with disabled on .

  if (loading) return <LoadingIndicator />;
  if (user.$id === playlist.createdBy) isAuthor = true;
  return (
    <div id="playlistPage" className="flex-grow px-4 flex flex-col gap-4">
      {/* <!-- PlaylistsData --> */}
      <div className="h-44 bg-black bg-opacity-50 rounded-md p-2">
        <form onSubmit={updatePlaylist} className="flex gap-4 h-full">
          <div id="imageInput" className="h-full relative">
            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              accept="image/*"
              disabled={!editing}
              className="playlistInput absolute top-0 left-0 cursor-pointer opacity-0 h-full w-full"
            />
            <img
              src={storageService.getPreview(playlist.cover)}
              alt="Default Image"
              className="h-full w-48 rounded-md"
            />
          </div>
          <div className="flex-grow relative pb-2">
            <input
              type="text"
              placeholder="Your playlistName"
              autoFocus={!editing}
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              disabled={!editing}
              className="playlistInput text-2xl font-lato text-white font-bold bg-transparent block"
            />
            <input
              type="text"
              placeholder="Your Description"
              value={playlistDescription}
              onChange={(e) => setPlaylistDescription(e.target.value)}
              disabled={!editing}
              className="playlistInput text-md font-lato text-white bg-transparent text-wrap w-full"
            />
            <div className="w-full absolute bottom-0 flex justify-between pr-4 items-center">
              <p className="text-md font-lato text-white inline-block">
                {playlist.tracks.length} Tracks
              </p>
              <div>
                {!editing ? (
                  <svg
                    className="inline-block mr-2 hover:cursor-pointer"
                    onClick={() => setEditing(true)}
                    id="editButton"
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
                ) : (
                  <button
                    type="submit"
                    className="rounded-full bg-transparent h-fit w-fit"
                  >
                    <svg
                      className="inline-block mr-2"
                      width="30px"
                      height="30px"
                      viewBox="0 0 48 48"
                      version="1"
                      xmlns="http://www.w3.org/2000/svg"
                      enableBackground="new 0 0 48 48"
                    >
                      <circle fill="#F7941D" cx="24" cy="24" r="21" />
                      <polygon
                        fill="#DBD4D0"
                        points="34.6,14.6 21,28.2 15.4,22.6 12.6,25.4 21,33.8 37.4,17.4"
                      />
                    </svg>
                  </button>
                )}
                <svg
                  className="inline-block ml-2 hover:cursor-pointer"
                  onClick={playPlaylist}
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
        {playlist.tracks.map((trackId) => {
          return (
            <div key={trackId}>
              <SongItem trackId={trackId} />
            </div>
          );
        })}
      </div>
      {/* <!-- Add Songs (Search Component)--> */}
      {isAuthor && <Search />}
    </div>
    // another way can be to send playlist id all the way to SongItem -propdrilling(maybe not good)
  );
}
