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
        <div className="flex flex-col gap-10 justify-center items-center h-full w-full">
            {error && <p className="text-sm font-lato text-red-400">Some error: {error}</p>}
            <h1 className="text-3xl font-lato text-white">Amuse!</h1>
            <h3 className="text-xl font-lato text-white">Music for Everyone</h3>
            <button onClick={handleLogin} className="text-white">Login with google</button>
            <button onClick={handleLogin} className="text-white">Signup with google</button>
        </div>
    )
}