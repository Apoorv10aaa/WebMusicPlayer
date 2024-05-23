import storageService from "../appwrite/bucket";

export default function AlbumPreview({ album }) {
  return (
    <div className="p-2 relative bg-[#202020] bg-opacity-50 rounded-lg hover:bg-white hover:bg-opacity-10">
      <div className="flex flex-col justify-between space-y-2">
        <img
          src={storageService.getPreview(album.coverId)}
          alt="Song Image"
          className="h-28 w-32 rounded-lg"
        />
        <div id="songDetail">
          <p className="text-sm text-white font-lato font-bold">
            {album.albumName}
          </p>
          <p className="text-xs text-white font-lato text-wrap">
            {album.release}
          </p>
        </div>
      </div>
    </div>
  );
}
