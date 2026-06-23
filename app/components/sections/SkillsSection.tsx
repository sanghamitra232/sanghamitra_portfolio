'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Skill } from '@/app/types';
import AudioButton from '@/app/components/ui/AudioButton';
interface SkillsProps {
  skills: Skill[];
}
export default function SkillsSection({ skills }: SkillsProps) {
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);
  const rotationRef = useRef(0);
const animRef = useRef<number>(0);
const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const animate = () => {
      rotationRef.current += 0.08;
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);
  const categories = [
    { key: 'core', label: 'Core Science', color: '#FF6B6B' },
    { key: 'digital', label: 'Digital & Tech', color: '#4ECDC4' },
    { key: 'creative', label: 'Creative', color: '#DDA0DD' },
  ];
  return (
    <section id="skills" className="relative min-h-screen py-20 bg-[#0a0a14] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
      <div className="w-full max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Skills</h2>
          <p className="text-slate-400 mt-4 max-w-xl text-center" style={{ maxWidth: '1300px' }}>Click any skill orb to explore. Each one is a world of knowledge built over years of deliberate practice.</p>
        </motion.div>
        {/* Category legend */}
        <div className="flex justify-center gap-6 mb-12">
          {categories.map(cat => (
            <div key={cat.key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
              <span className="text-xs text-slate-100">{cat.label}</span>
            </div>
          ))}
        </div>
        {/* Galaxy container */}
        <div className="relative flex items-center justify-center" style={{ height: 600 }}>
          {/* Orbital rings */}
          {[180, 240].map((r, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-purple-500/10"
              style={{ width: r * 2, height: r * 2 }}
            />
          ))}
          {/* Center core */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-violet-800 flex items-center justify-center text-3xl shadow-2xl shadow-purple-900/60 z-10 border-2 border-purple-400/40"
          >
            ⚡
          </motion.div>
          {/* Rotating wrapper */}
          <div
            className="absolute"
            ref={wrapperRef}
            style={{
              width: 400,
              height: 400,
            }}
          >
            {skills.map((skill, i) => {
              const angle = (i / skills.length) * 360;
              const radius = 180;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              return (
                <button
                  key={skill.id}
                  onClick={() => setActiveSkill(activeSkill?.id === skill.id ? null : skill)}
                  className="absolute cursor-pointer"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${-rotationRef.current}deg)`,
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xl border-2 transition-all duration-300"
                    style={{
                      backgroundColor: skill.color + '20',
                      borderColor: activeSkill?.id === skill.id ? skill.color : skill.color + '60',
                      boxShadow: activeSkill?.id === skill.id
                        ? `0 0 24px ${skill.color}80`
                        : `0 0 8px ${skill.color}40`,
                    }}
                  >
                    {skill.emoji}
                  </motion.div>
                </button>
              );
            })}
          </div>
        </div>
        {/* Skill detail panel */}
        <AnimatePresence>
          {activeSkill && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute p-5 rounded-2xl border backdrop-blur-md z-50"
style={{
  backgroundColor: activeSkill.color + '10',
  borderColor: activeSkill.color + '40',
  boxShadow: `0 0 40px ${activeSkill.color}20`,
  width: 260,
  left: skills.findIndex(s => s.id === activeSkill.id) < skills.length / 2 ? 'auto' : '20px',
  right: skills.findIndex(s => s.id === activeSkill.id) < skills.length / 2 ? '20px' : 'auto',
  top: '50%',
  transform: 'translateY(-50%)',
}}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{activeSkill.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold text-white">{activeSkill.title}</h3>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium uppercase tracking-wide"
                    style={{ backgroundColor: activeSkill.color + '30', color: activeSkill.color }}
                  >
                    {activeSkill.category}
                  </span>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed">{activeSkill.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Skills grid for mobile */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:hidden gap-3">
          {skills.map((skill) => (
            <button
              key={skill.id}
              onClick={() => setActiveSkill(activeSkill?.id === skill.id ? null : skill)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-left"
            >
              <span>{skill.emoji}</span>
              <span className="text-xs text-slate-300">{skill.title}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}