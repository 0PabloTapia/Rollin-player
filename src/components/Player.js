import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faBackward, faForward } from '@fortawesome/free-solid-svg-icons'

const Player = () => {
    return (
        <div className="player">
            <div className="time-control">
                <p>Start time</p>
                <input type="range"/>
                <p>End Time</p>
        </div>
        <div className="playcontrol">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faBackward} />
        <FontAwesomeIcon className="play" size="2x" icon={faPlay} />
        <FontAwesomeIcon className="skip-forward" size="2x" icon={faForward} />
        </div>
    </div>

    )
}

export default Player;