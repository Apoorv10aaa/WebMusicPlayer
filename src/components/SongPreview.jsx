export default function SongPreview(song){
    return(
        <div>
            <img src={song.cover} alt="song" />
            <h1>{song.title}</h1>
            <h2>{song.artist}</h2>
            {song.artists.map((artist,index)=>{
                return(
                    <span key={index}>{artist}</span>
                )
            })}
        </div>
    )
}