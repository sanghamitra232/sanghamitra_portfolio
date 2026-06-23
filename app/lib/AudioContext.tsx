'use client';
import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

interface AudioContextType {
  currentAudio: string | null;
  isPlaying: boolean;
  isMuted: boolean;
  play: (src: string) => void;
  pause: () => void;
  replay: () => void;
  toggleMute: () => void;
}

const AudioCtx = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mutedRef = useRef(false);

  const play = useCallback((src: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
    }
    const audio = new Audio(src);
    audio.muted = mutedRef.current;
    audioRef.current = audio;
    setCurrentAudio(src);
    audio.play().catch(() => {});
    setIsPlaying(true);
    audio.onended = () => setIsPlaying(false);
  }, []);

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
    mutedRef.current = !mutedRef.current;
    setIsMuted(mutedRef.current);
    if (audioRef.current) audioRef.current.muted = mutedRef.current;
  }, []);

  return (
    <AudioCtx.Provider value={{ currentAudio, isPlaying, isMuted, play, pause, replay, toggleMute }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useGlobalAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useGlobalAudio must be used within AudioProvider');
  return ctx;
}
