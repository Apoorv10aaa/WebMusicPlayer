export default function PlaylistPreview(playlist){

    return(
        <div>
            <img src={playlist.cover}/>
            <span>{playlist.createdBy}</span>
        </div>
    )
}