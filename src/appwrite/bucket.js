import { Client,Storage,ID } from "appwrite";
import conf from "../conf/conf";

export class StorageServices{
    client=new Client();
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.storage=new Storage(this.client);
    }

    // storage services

    async addFile(file){
        try {
            const fileData= await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return fileData;
        } catch (error) {
            console.log("Error in Storage => ",error);
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
            return this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Error in Storage => ",error);
            throw error;
        }
    }

    async getFile(fileId){
        try {
            const fileData=await this.storage.getFile(
                conf.appwriteBucketId,
                fileId
            )
            return fileData;
        } catch (error) {
            console.log("Error in Storage => ",error);
            throw error;
        }
    }

    getPreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    getFileForDownload(fileId){
        return this.storage.getFileDownload(
            conf.appwriteBucketId,
            fileId
        );
    }
}