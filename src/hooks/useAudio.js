import { useRef, useState, useCallback } from 'react';

// CC0 bird ambience — hosted on GitHub raw (no CORS issues, works on any deployment)
const BIRD_URL = 'https://cdn.freesound.org/previews/560/560908_7037-lq.mp3';

export function useAudio() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(BIRD_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.35;
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing]);

  return { playing, toggle };
}

