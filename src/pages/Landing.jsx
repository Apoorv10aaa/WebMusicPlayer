import { useState } from "react";
import authService from "../appwrite/auth";
import {useDispatch} from 'react-redux'
import { login } from "../store/authSlice";
import databaseService from "../appwrite/database";

export default function Landing(){
    const [error,setError]= useState();
    const dispatch=useDispatch();
    const handleLogin= async ()=>{
        try {
            setError(null);
            await authService.loginWithGoogle().then(()=>{
                const userData= authService.getCurrentuser();
                //check if user exists in DB
                const user=databaseService.getUser(userData.$id);
                if(user){
                    dispatch(login(user));
                }else{
                    databaseService.addUser({...userData});
                    dispatch(login(userData));
                }
            });
        } catch (error) {
            console.log("Error in logging in");
            setError(error.message);
        }
    }
    return (
        <>
        <div>Landing</div>
        {error ? (<p>error</p>) : null}
        </>
    )
}