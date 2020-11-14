import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPlay, 
    faBackward, 
    faForward,
    faPauseCircle 
   } from '@fortawesome/free-solid-svg-icons';


const Player = ({ currentSong, setCurrentSong, setIsPlaying, isPlaying, audioRef, songs, setSongs }) => {

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if(song.id === nextPrev.id) {
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
        });
        setSongs(newSongs);
    }

    const playSongHandler = () => {
     
        isPlaying ? audioRef.current.pause() : audioRef.current.play()
        setIsPlaying(!isPlaying);
    };

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        //calcular porcentaje
        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animation = Math.round((roundedCurrent / roundedDuration) * 100)
        console.log(animation)

        setSongInfo({...songInfo, currentTime: current, duration: duration, animationPercentage: animation})
    }

    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    

    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        let newIndex = 0;
        
        switch (direction) {

          case "skip-forward":
            await new Promise(r => setTimeout(r, 200));
            //al llegar al máximo, se devuelve a 0
            newIndex = (currentIndex + 1) % songs.length;
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
            break;
        
          case "skip-back":
            await new Promise(r => setTimeout(r, 200));
            //al llegar a 0, se devuelve al máximo
            newIndex = (songs.length - 1 + currentIndex) % songs.length;
            activeLibraryHandler(songs[(songs.length - 1 + currentIndex) % songs.length]);
            break;
            default: console.log('Error inesperado')
        }
    
        setCurrentSong(songs[newIndex]);
        if(isPlaying) audioRef.current.play();
      };

    const grabAndDrag =  (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value })
        console.log(e)
    }

    const songEndHandler = async () => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        if(isPlaying) audioRef.current.play();
        
        return;
    }

    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });
    //Animación input
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
            <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                <input 
                    min={0} 
                    max={songInfo.duration || 0} 
                    value={songInfo.currentTime}
                    onChange={grabAndDrag} 
                    type="range"
                />
                <div style={trackAnim} className="animate-track"></div>
            </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
        </div>
        <div className="playcontrol">
        <FontAwesomeIcon onClick={() => skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faBackward} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPauseCircle : faPlay} />
        <FontAwesomeIcon onClick={() => skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faForward} />
        </div>
        <div className="name"><footer>Created by 0PabloTapia</footer></div>
        <audio 
            onTimeUpdate={timeUpdateHandler} 
            onLoadedMetadata={timeUpdateHandler} 
            ref={audioRef} 
            src={currentSong.audio}
            onEnded={songEndHandler}
        ></audio>
    </div>

    )
}

export default Player;


