

const LibrarySong = ( {song, songs, setCurrentSong, id, isPlaying, audioRef, setSongs} ) => {
    // Deja la canción seleccionada en la librería cambiando su clase en base al boolean de los objetos 
    //  que están en el arreglo data.js
    const songSelectHandler = async () => {
        await setCurrentSong(song);

        const newSongs = songs.map((song) => {
            if(song.id === id) {
                return {
                    ...song, 
                    active: true
                }
            } else {
                return {
                    ...song,
                    active: false
                }
            }
        })
        setSongs(newSongs)

        if(isPlaying) audioRef.current.play();
    };

    return (
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img alt={song.name} src={song.cover}></img>
            <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;