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

    async addUser({userName,email,userId,profile}){
        try { // remember you will use session token of google auth for fetching profile(.fetch)
            const userData=this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersId,
                userId,
                {
                    userName,email,userId,profile
                }
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

    async addPlaylist({playlistId=ID.unique(),name,description,createdBy,tracks,isPublic}){
        try {
            const playlistData=this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwritePlaylistsId,
                playlistId,
                {
                    playlistId,name,description,createdBy,tracks,isPublic
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

    async updatePlaylist(playlistId,{name,description,tracks}){
        try {
            const playlistData=await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwritePlaylistsId,
                playlistId,
                {
                    name,description,tracks
                }
            );
            return playlistData;
        } catch (error) {
            console.log("Error in Database => ",error);
            throw error;
        }
    }

    async updateUserProfile(userId,{email,userName,profile,recents}){
        try {
            const userData=await this.database.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUsersId,
                userId,
                {
                    email,userName,profile,recents
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
}

const databaseService=new DatabaseService();
export default databaseService;