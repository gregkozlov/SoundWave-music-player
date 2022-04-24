import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faAngleLeft, faAngleRight, faPause} from '@fortawesome/free-solid-svg-icons';
import {ISong} from '../interfaces/interfaces';
import {ISongInfo} from '../interfaces/interfaces';

interface iPlayer {
  currentSong: ISong;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  songInfo: ISongInfo;
  setSongInfo: (songInfo: ISongInfo) => void;
  songs: ISong[];
  setCurrentSong: (currentSong: ISong) => void;
  setSongs: (songs: ISong[]) => void;
}

interface iActiveLibraryHandler {
  name: string;
  artist: string;
  id: string;
  active: boolean;
  color: string[];
  cover: string;
  audio: string;
}

const Player = (props: iPlayer) => {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    audioRef,
    songInfo,
    setSongInfo,
    songs,
    setCurrentSong,
    setSongs
  } = props;

  const activeLibraryHandler = (nextPrev: iActiveLibraryHandler) => {
    const newSongs = songs.map(song => {
      return {
        ...song,
        active: song.id === nextPrev.id
      };
    });
    setSongs(newSongs);
  };

  const playSongHandler = () => {
    if (isPlaying && audioRef.current != null) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else if (audioRef.current != null) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const getTime = (time: number) => {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
  };

  const dragHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current != null) {
      if (audioRef.current != null) {
        audioRef.current.currentTime = Number(e.target.value);
        setSongInfo({...songInfo, currentTime: Number(e.target.value)});
      }
    }
  };

  const skipTrackHandler = async (direction: string): Promise<void> => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const oneSongForward = songs[(currentIndex + 1) % songs.length];
    const oneSongBackward = songs[songs.length - 1];
    const oneSongBackwardOnLastSong = songs[(currentIndex - 1) % songs.length];
    if (direction === 'skip-forward') {
      await setCurrentSong(oneSongForward);
      activeLibraryHandler(oneSongForward);
    }
    if (direction === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(oneSongBackward);
        activeLibraryHandler(oneSongBackward);
        if (isPlaying && audioRef.current != null) audioRef.current.play();
        return;
      }
      await setCurrentSong(oneSongBackwardOnLastSong);
      activeLibraryHandler(oneSongBackwardOnLastSong);
    }
    if (isPlaying && audioRef.current != null) audioRef.current.play();
  };

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-back')}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler('skip-forward')}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};

export default Player;
