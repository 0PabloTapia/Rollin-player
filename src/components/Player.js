import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPlay, 
    faBackward, 
    faForward,
    faPauseCircle 
   } from '@fortawesome/free-solid-svg-icons'

const Player = ({ currentSong, setIsPlaying, isPlaying, audioRef }) => {

    const playSongHandler = () => {
     
        isPlaying ? audioRef.current.pause() : audioRef.current.play()
        setIsPlaying(!isPlaying);
    };

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo, currentTime: current, duration: duration})
    }

    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const grabAndDrag = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value })
    }

    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input 
                    min={0} 
                    max={songInfo.duration} 
                    value={songInfo.currentTime}
                    onChange={grabAndDrag} 
                    type="range"
                /><p>{getTime(songInfo.duration)}</p>
        </div>
        <div className="playcontrol">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faBackward} />
        <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPauseCircle : faPlay} />
        <FontAwesomeIcon className="skip-forward" size="2x" icon={faForward} />
        </div>
        <audio 
            onTimeUpdate={timeUpdateHandler} 
            onLoadedMetadata={timeUpdateHandler} 
            ref={audioRef} 
            src={currentSong.audio}
        ></audio>
    </div>

    )
}

export default Player;