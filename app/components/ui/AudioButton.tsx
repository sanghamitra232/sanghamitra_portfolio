'use client';
import { useGlobalAudio } from '@/app/lib/AudioContext';
import { FiPlay, FiPause } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface AudioButtonProps {
  src: string;
  label?: string;
  className?: string;
}

export default function AudioButton({ src, label = 'Play Audio', className = '' }: AudioButtonProps) {
  const { currentAudio, isPlaying, play, pause } = useGlobalAudio();

  const isThisPlaying = currentAudio === src && isPlaying;

  const handleClick = () => {
    if (isThisPlaying) {
      pause();
    } else {
      play(src);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/50 bg-purple-900/30 text-purple-300 hover:bg-purple-600/40 hover:text-white transition-all text-sm ${className}`}
    >
      {isThisPlaying ? (
        <>
          <FiPause size={14} />
          <span>Pause</span>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3].map((_, i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-purple-400 rounded-full"
                animate={{ scaleY: [1, 3, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                style={{ height: 8 }}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <FiPlay size={14} />
          <span>{label}</span>
        </>
      )}
    </motion.button>
  );
}
