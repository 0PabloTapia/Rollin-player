import LibrarySong from './LibrarySong';

const Library = ( {songs, setCurrentSong, isPlaying, audioRef, setSongs} ) => {

    return(
        <div className="library">
            <h2>Librería</h2>
            <div className="library-songs">
                {songs.map((song) => (
                    <LibrarySong 
                        setCurrentSong={setCurrentSong} 
                        songs={songs} 
                        song={song} 
                        id={song.id}
                        key={song.id}
                        isPlaying={isPlaying}
                        audioRef={audioRef}
                        setSongs={setSongs} 
                    />))}
            </div>
        </div>
    )
}


export default Library;