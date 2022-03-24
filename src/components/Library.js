import React from 'react';
import LibrarySong from './LibrarySong';

const Library = props => {
  const {songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus} = props;

  return (
    <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map(song => (
          <LibrarySong
            key={song.id}
            id={song.id}
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
