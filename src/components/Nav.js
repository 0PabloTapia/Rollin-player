import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

const Nav = ( {libraryStatus, setLibraryStatus} ) => {
    return(
        <nav>
            <h1>Rollin'Player</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faHeadphones} libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
            </button>
        </nav>
    )
}

export default Nav;