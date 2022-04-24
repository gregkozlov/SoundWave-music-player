import React from 'react';
import {ISong} from '../interfaces/interfaces';

interface iLibrarySong {
  song: ISong;
  songs: ISong[];
  setCurrentSong: (currentSong: ISong) => void;
  id: string;
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setSongs: (songs: ISong[]) => void;
}

const LibrarySong = (props: iLibrarySong) => {
  const {song, songs, setCurrentSong, id, audioRef, isPlaying, setSongs} = props;

  const songSelectHandler = async (): Promise<void> => {
    await setCurrentSong(song);

    const newSongs = songs.map(song => {
      return {
        ...song,
        active: song.id === id
      };
    });
    setSongs(newSongs);

    if (isPlaying && audioRef.current !== null) audioRef.current.play();
  };

  return (
    <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
