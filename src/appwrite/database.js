import {Client,Databases,ID,Query} from 'appwrite';
import conf from '../conf/conf';

export  class DatabaseService{
    client=new Client();
    database;
    
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.database=new Databases(this.client);
    }

    // database services

    async addUser({name,email,userId,profile}){
        try { // remember you will use session token of google auth for fetching profile(.fetch)
            const userData=this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersId,
                userId,
                {
                    userName:name,email,userId,profile:profile.picture
                }
            );
            return userData;
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async getUser(userId){
        try {
            const userData=this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersId,
                userId
            );
            return userData;
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async addTrack({trackId=ID.unique(),songName,artist,albumId,genre,duration,fileId,userId}){
        try {
            const trackData=this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTracksId,
                trackId,
                {
                    trackId,songName,artist,albumId,genre,duration,fileId,userId
                }
            );
            return trackData;
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async addPlaylist({playlistId=ID.unique(),
        name="My Playlist",
        description="Your Description....",
        createdBy,tracks=[],isPublic,cover}){
        try {
            const playlistData=this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwritePlaylistsId,
                playlistId,
                {
                    playlistId,name,description,createdBy,tracks,isPublic,cover
                }
            );
            return playlistData;
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async getAlbums(){
        try {
            const albums= this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteAlbumsId
            );
            return albums;
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async getAlbum(albumId){
        try {
            const album=await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteAlbumsId,
                albumId
            )
            return album;
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async getPlaylists(userId=null){
        try {
            let playlists=null;
            if(userId){
                playlists= this.database.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwritePlaylistsId,
                    [Query.equal("createdBy",userId)]
                )
            }
            else{
                playlists=this.database.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwritePlaylistsId
                )
            }
            return playlists;
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async getPlaylist(playlistId){
        try {
            const playlist=await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwritePlaylistsId,
                playlistId
            )
            return playlist;
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async getTrack(trackId){
        try {
            const track=await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTracksId,
                trackId
            )
            return track;
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async getTracks(){
        try {
            const tracks= this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteTracksId
            );
            return tracks;
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async getPlaylistTracks(playlistId){
        try {
            const tracks=await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwritePlaylistsId,
                playlistId
            ).then((playlist)=> playlist.tracks);
            return tracks;
            
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async getAlbumTracks(albumId){
        try {
            const tracks=await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteAlbumsId,
                albumId
            ).then((album)=> album.tracks);
            return tracks;
            
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async recentlyPlayed(userId){
        try {
            const recents= await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersId,
                userId
            ).then((user)=> user.recents);
            return recents;
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async updatePlaylist(playlistId,{name,description,tracks,cover}){
        try {
            const playlistData=await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwritePlaylistsId,
                playlistId,
                {
                    name,description,tracks,cover
                }
            );
            return playlistData;
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async updateUserProfile(userId,{email,userName,profile,recents,liked}){
        try {
            const userData=await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersId,
                userId,
                {
                    email,userName,profile,recents,liked
                }
            );
            return userData;
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async updateRecents(userId,trackId){
        try {
            let recents= await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersId,
                userId
            ).then((user)=> user.recents);
            if(recents.length>=7){
                for(let i=recents.length-1;i>0;i--){
                    recents[i]=recents[i-1];
                }
                recents[0]=String(trackId);
            }else{
                recents.push(" ");
                for(let i=recents.length-1;i>0;i--){
                    recents[i]=recents[i-1];
                }
                recents[0]=String(trackId);
            }

            const userData=await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersId,
                userId,
                {
                    recents
                }
            );
            return userData;
            
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async deletePlaylist(playlistId){
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwritePlaylistsId,
                playlistId
            )
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async deleteTrack(trackId){
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteTracksId,
                trackId
            )
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async getRandom(){
        var songs=[];
        this.getTracks().then(
            (tracks)=>{
                if(tracks) songs=tracks.documents;
            }
        );
        const len=songs.size()-1;
        var ind=Math.floor(Math.random()*len +1);
        var songId=songs[ind];
        var trackData=null;
        this.getTrack(songId).then((track)=> trackData=track);
        return trackData;

    }
}

const databaseService=new DatabaseService();
export default databaseService;