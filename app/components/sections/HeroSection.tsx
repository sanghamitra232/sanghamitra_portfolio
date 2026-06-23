'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import type { PersonalData } from '@/app/types';
import { useGlobalAudio } from '@/app/lib/AudioContext';

const Avatar3D = dynamic(() => import('@/app/components/three/Avatar3D'), { ssr: false });

const NAV_ITEMS = [
  { label: 'Research', href: '#research', emoji: '🔬' },
  { label: 'Projects', href: '#projects', emoji: '🚀' },
  { label: 'Skills', href: '#skills', emoji: '⚡' },
  { label: 'Internships', href: '#internships', emoji: '🏢' },
  { label: 'Industrial', href: '#industrial', emoji: '🏭' },
  { label: 'Certifications', href: '#certifications', emoji: '🏆' },
  { label: 'Achievements', href: '#achievements', emoji: '🌟' },
  { label: 'Contact', href: '#contact', emoji: '📬' },
];

interface HeroProps {
  personal: PersonalData;
}

export default function HeroSection({ personal }: HeroProps) {
  const [showNav, setShowNav] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { play } = useGlobalAudio();

  useEffect(() => {
    const timer = setTimeout(() => {
      play('/audios/welcome.mp3');
    }, 1000);
    const navTimer = setTimeout(() => setShowNav(true), 3500);
    return () => { clearTimeout(timer); clearTimeout(navTimer); };
  }, [play]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a14]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-950/40 via-[#0a0a14] to-[#0a0a14]" />

      {/* Intro video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-100" style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
        src="https://drive.google.com/file/d/19VA3cgRr2hQLzu3E35BlRl6pXGreveAF/view"
        autoPlay
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(124,58,237,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4 w-full max-w-7xl mx-auto">

        {/* Name and tagline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white">
              {personal.name}
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-black-300 font-light tracking-wide">
            {personal.tagline}
          </p>
          <p className="mt-3 text-sm text-black-50 tracking-widest uppercase">
            {personal.location} · {personal.university}
          </p>
        </motion.div>

        {/* Animated intro text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="px-6 py-3 rounded-full border border-purple-500/30 bg-purple-900/20 backdrop-blur-sm"
        >
          <p className="text-purple-200/80 text-sm md:text-base italic">
            &quot;{personal.intro}&quot;
          </p>
        </motion.div>

        {/* Navigation cards */}
        <AnimatePresence>
          {showNav && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl mt-4"
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.4, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo(item.href)}
                  className="flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border border-purple-500/30 bg-purple-900/60 hover:bg-purple-800/40 hover:border-purple-400/80 backdrop-blur-sm text-white transition-all duration-300 shadow-lg hover:shadow-purple-900/40 cursor-pointer"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-xs font-medium tracking-wide text-purple-200">{item.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll indicator */}
        <AnimatePresence>
          {showNav && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex flex-col items-center gap-2 mt-4"
            >
              <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-px h-8 bg-gradient-to-b from-purple-500 to-transparent"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
