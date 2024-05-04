export default function AlbumPreview(album){

    return(
        <div>
            <img src={album.cover}/>
            <h3>{album.name}</h3>
        </div>
    )
}