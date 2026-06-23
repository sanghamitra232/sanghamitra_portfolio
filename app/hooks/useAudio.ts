'use client';
import { useState, useRef, useCallback } from 'react';

export function useAudio() {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback((src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(src);
    audio.muted = isMuted;
    audioRef.current = audio;
    setCurrentAudio(src);
    audio.play().catch(() => {});
    setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
  }, [isMuted]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const replay = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      if (audioRef.current) audioRef.current.muted = !prev;
      return !prev;
    });
  }, []);

  return { currentAudio, isPlaying, isMuted, play, pause, replay, toggleMute };
}
