
import {Link} from 'react-router-dom';

export default function Error404(){
    return(
        <div className="flex flex-col h-screen w-full text-[#F7941D] items-center justify-center">
            <h1 className="text-3xl">Error 404</h1>
            <p>This page does not exist </p>
            <Link to={"/Home"}>Go to Home</Link>
        </div>
    )
}