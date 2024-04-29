import { useState } from "react";
import authService from "../appwrite/auth";

export default function Landing(){
    const [error,setError]= useState();
    const handleLogin= async ()=>{
        try {
            setError(null);
            await authService.loginWithGoogle();
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