import { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import LoadingIndicator from 'index';

function AuthLayout({children,path}){
    const [loading,setLoading]= useState(true);
    const authStatus=useSelector((state)=>state.auth.status);
    const navigate=useNavigate();

    useEffect(()=>{
        if(authStatus) navigate(path);
        else navigate("/Landing");
        setLoading(false);
    },[authStatus,navigate,path]);

    return (
        loading ? <LoadingIndicator /> : (<>{children}</>)
    );
}
export default AuthLayout;