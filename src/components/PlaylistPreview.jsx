import storageService from "../appwrite/bucket";

export default function PlaylistPreview({ playlist }) {
  return (
    <div className="p-2 relative bg-[#202020] bg-opacity-50 rounded-lg hover:bg-white hover:bg-opacity-10">
      <div className="flex flex-col justify-between space-y-2">
        <img
          src={storageService.getPreview(playlist.cover)}
          alt="Song Image"
          className="h-28 w-32 rounded-lg"
        />
        <div id="songDetail">
          <p className="text-sm text-white font-lato font-bold">
            {playlist.name}
          </p>
          <p className="text-xs text-white font-lato text-wrap">
            {playlist.description}
          </p>
        </div>
      </div>
    </div>
  );
}
