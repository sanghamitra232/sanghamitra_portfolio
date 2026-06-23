'use client';
import { useGlobalAudio } from '@/app/lib/AudioContext';
import { FiVolume2, FiVolumeX, FiPlay, FiPause, FiRotateCcw } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function GlobalAudioController() {
  const { isPlaying, isMuted, pause, replay, toggleMute } = useGlobalAudio();

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="fixed bottom-8 right-6 z-50 flex flex-col items-center gap-2"
    >
      <div className="bg-black/60 backdrop-blur-md border border-purple-500/30 rounded-2xl p-3 flex flex-col gap-2 shadow-2xl shadow-purple-900/30">
        <button
          onClick={toggleMute}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white hover:bg-purple-600/50 transition-colors"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
        </button>

        <AnimatePresence>
          {isPlaying && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={pause}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white hover:bg-purple-600/50 transition-colors"
              title="Pause"
            >
              <FiPause size={18} />
            </motion.button>
          )}
        </AnimatePresence>

        <button
          onClick={replay}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white hover:bg-purple-600/50 transition-colors"
          title="Replay"
        >
          <FiRotateCcw size={16} />
        </button>

        {/* Audio waveform visual indicator */}
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-0.5 px-1 h-6"
            >
              {[1, 2, 3, 4, 3].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-purple-400 rounded-full"
                  animate={{ scaleY: [1, h, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                  style={{ height: 4 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
