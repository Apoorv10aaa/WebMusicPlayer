
import {Outlet} from 'react-router-dom'
import {Header,LoadingIndicator,Player} from './components/index';
import { useState,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import {login,logout} from './store/authSlice'
import {useNavigate} from 'react-router-dom';

function App() {
  const [loading,setLoading]=useState(true);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  
  useEffect(()=>{
    authService.getCurrentuser().then((userData)=> {
      if(userData){
        dispatch(login(userData));
        navigate("/home");
      }else{
        dispatch(logout());
      }
  })
  .finally(setLoading(false))
  },[])

  return loading ? (<LoadingIndicator />) : (
    <>
    <div className="min-h-screen flex flex-wrap content-between">
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Player />
      </div>
    </div>
    </>
  )
}

export default App
