import {useSelector} from 'react-redux';
import databaseService from '../appwrite/database';
import {useNavigate} from 'react-router-dom';
import { ID } from 'appwrite';
import { Link } from 'react-router-dom';
import PlaylistPreview from './index';
import SongPreview from './index';

export default function Profile(){
    const userData=useSelector((state)=> state.auth.userData);
    const recents=userData.recents;
    const liked=userData.liked;
    const userPlaylists=databaseService.getPlaylists(userData.$id);
    const navigate=useNavigate();

    function createPlaylist(){
        const playlistId=ID.unique();
        databaseService.addPlaylist(playlistId);
        navigate(`/plalist/${playlistId}`)
    }

    return (
        <div>
            <div id="userPlaylists">
                <span>Playlist</span>
                {userPlaylists.map((playlist)=>(
                    <Link to={`/playlist/${playlist.$id}`} key={playlist.$id}>
                        <PlaylistPreview  playlist={playlist}/>
                    </Link>
                ))}
            </div>
            <div id="recents">
                {recents.map((song)=>{
                    return (
                        <Link to={`/song/${song.$id}`} key={song.$id}>
                            <SongPreview  song={song}/>
                        </Link>
                    )
                })}
            </div>
            <div id="liked">
                {liked.map((song)=>{
                    return (
                        <Link to={`/song/${song.$id}`} key={song.$id}>
                            <SongPreview  song={song}/>
                        </Link>
                    )
                })}
            </div>
            <button onClick={createPlaylist()}>
                Create Playlist
            </button>
        </div>
    )
}