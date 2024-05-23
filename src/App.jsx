import { Outlet } from "react-router-dom";
import { Header, LoadingIndicator, Player, SongData } from "./components/index";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";

function App() {
  const authStatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const songData = useSelector((state) => state.song.songData);
  console.log("app render..");

  function onLogout() {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const userData = await authService.getCurrentuser();
        console.log(userData);
        if (userData) {
          dispatch(login(userData));
          navigate("/home");
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log("Error in App", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [dispatch, navigate]);

  if (loading) {
    console.log("loadding...");
    return <LoadingIndicator />;
  }
  console.log("after loading ");
  if (!authStatus) return <Landing />;

  return (
    <>
      <div className="flex flex-grow">
        <Header />
        <div
          id="middle-section"
          className="flex-grow flex flex-col rounded-lg gap-4"
        >
          <div id="premium" className="h-16 px-4 ">
            <div className="h-full w-full border-b-2 border-zinc-500 flex justify-between items-center rounded-sm">
              {/* <!-- Brand Div --> */}
              <div id="brand" className="flex items-center space-x-1">
                <img src="/logo.png" alt="Brand Logo" className="h-14 w-16" />
                <h1 className="text-3xl font-lato text-white font-bold ">
                  Amuse
                </h1>
              </div>
              {/* <!-- Buttons Div --> */}
              <div id="buttons flex items-center space-x-3">
                <button className=" bg-[#D47A30] py-1 rounded-3xl text-white w-36 font-lato hover:bg-[#DBD4D0] hover:shadow-sm hover:shadow-gray-300">
                  Premium
                </button>
                <div className="inline-block">
                  <svg
                    onClick={onLogout}
                    className="inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#DBD4D0"
                    width="35px"
                    height="35px"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <main>
            <Outlet />
          </main>
        </div>
        {songData && <SongData />}
      </div>
      {songData && <Player />}
    </>
  );
}

export default App;
