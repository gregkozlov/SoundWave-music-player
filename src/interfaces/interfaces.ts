export interface ISong {
  name: string;
  artist: string;
  id: string;
  active: boolean;
  color: string[];
  cover: string;
  audio: string;
}

export interface ISongInfo {
  currentTime: number;
  duration: number;
  animationPercentage: number;
}

export interface iLibrary {
  songs: ISong[];
  setCurrentSong: (currentSong: ISong) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
  setSongs: (songs: ISong[]) => void;
  libraryStatus: boolean;
}
