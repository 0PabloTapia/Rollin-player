import { useState, useRef } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import './styles/app.scss';
import data from './util';

function App() {

  const audioRef = useRef(null)

  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying} 
        currentSong={currentSong}
        audioRef={audioRef} 
      />
      <Library 
        songs={songs} 
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        audioRef={audioRef}
        setSongs={setSongs} 
    /></div>
  );
}

export default App;
