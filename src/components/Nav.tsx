import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMusic} from '@fortawesome/free-solid-svg-icons';

interface iNav {
  libraryStatus: boolean;
  setLibraryStatus: (libraryStatus: boolean) => void;
}

const Nav = (props: iNav) => {
  const {libraryStatus, setLibraryStatus} = props;

  return (
    <nav>
      <h1>SoundWave</h1>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
