import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

const Nav = ( {libraryStatus, setLibraryStatus} ) => {
    return(
        <nav>
            <h1> <img src="/img/logo.png" alt="vinyllogo" className="logo-resize" /> </h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                <FontAwesomeIcon icon={faHeadphones} libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
                Library
            </button>
        </nav>
    )
}

export default Nav;
