import {useSelector} from 'react-redux';
import databaseService from '../appwrite/database';
import {useNavigate} from 'react-router-dom';
import { ID } from 'appwrite';

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
            <button onClick={createPlaylist()}>
                Create Playlist
            </button>
        </div>
    )
}