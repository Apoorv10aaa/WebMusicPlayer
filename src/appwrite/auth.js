// authentication services

import conf from '../conf/conf'
import {Client,Account} from 'appwrite';

export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client);
    }

    // here services functions
    async loginWithGoogle(){
        try {
            window.location.href = await this.account.createOAuth2Session(
                'google',
                'http://localhost:5173/home',
                'http://localhost:5173/landing',
                ['profile','email','name']
            );
        } catch (error) {
            console.log("Error at Auth => ",error);
            throw error;
        }
    }

    async getCurrentuser(){
        try {
            const session = await this.account.getSession('current');
            if(session){
                const userData= await this.account.get();
                return userData;
            }
            return null;
        } catch (error) {
            console.log("Error at Auth => ",error);
            throw error;
        }
    }

    async logout(){
        try {
            return this.account.deleteSessions();
        } catch (error) {
            console.log("Error at Auth => ",error);
            throw error;
        }
    }
}

const authService=new AuthService();
export default authService;
