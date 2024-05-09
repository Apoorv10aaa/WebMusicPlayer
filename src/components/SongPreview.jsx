export default function SongPreview(song){
    return(
        <div className="songItem p-2 relative bg-black bg-opacity-50 rounded-lg hover:bg-white hover:bg-opacity-10">
          <div className="flex flex-col justify-between space-y-2">
            <img
              src="./songImg.jpg"
              alt="Song Image"
              className="h-28 w-32 rounded-lg"
            />
            <div id="songDetail">
              <p className="text-sm text-white font-lato font-bold">
                Song2Name
              </p>
              <p className="text-xs text-white font-lato">Artist Name</p>
            </div>
          </div>
        </div>
    )
}