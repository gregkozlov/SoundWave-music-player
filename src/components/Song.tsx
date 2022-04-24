import React from 'react';

interface iCurrentSong {
  currentSong: {
    cover: string;
    name: string;
    artist: string;
  };
}

const Song = (props: iCurrentSong) => {
  const {currentSong} = props;

  return (
    <div className="song-container">
      <img src={currentSong.cover} alt={currentSong.name} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
