import { useState } from "react";
import authService from "../appwrite/auth";
import {useDispatch} from 'react-redux';
import {logout} from '../store/authSlice';
import {useNavigate} from 'react-router-dom';
import LoadingIndicator from './index';

function Header(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);

    function onLogout(){
        authService.logout().then(()=>{
            setLoading(true);
            dispatch(logout());
            navigate("/Landing");
        });
    }
    return(
        loading ? <LoadingIndicator /> : <div>Header</div>
    )
}
export default Header;
{ /**
Home,
Search,
YourLibrary-Playlists,Recents,Favourites,
Account-UserMetaData,
Logout */}