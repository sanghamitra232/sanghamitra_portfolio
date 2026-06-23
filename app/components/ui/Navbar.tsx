'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Research', href: '#research' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Internships', href: '#internships' },
  { label: 'Industrial', href: '#industrial' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Wins', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-purple-500/20 shadow-xl shadow-purple-900/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 tracking-wide"
        >
          SD
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-purple-800/30 rounded-lg transition-all duration-200 font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-5 h-px bg-purple-400"
              animate={{
                rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                y: menuOpen && i === 0 ? 6 : menuOpen && i === 2 ? -6 : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-xl border-b border-purple-500/20 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-purple-800/30 rounded-xl transition-all"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
