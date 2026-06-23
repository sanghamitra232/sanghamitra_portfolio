'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Achievement } from '@/app/types';

interface AchievementsProps {
  achievements: Achievement[];
}

function CounterCard({ achievement, delay }: { achievement: Achievement; delay: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = achievement.value / steps;
    let current = 0;
    let step = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), achievement.value);
        setCount(current);
        if (step >= steps) clearInterval(interval);
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [inView, achievement.value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: 'spring', stiffness: 150 }}
      whileHover={{ scale: 1.05, y: -4 }}
      className="relative flex flex-col items-center gap-3 p-6 rounded-3xl border border-purple-500/20 bg-purple-950/10 backdrop-blur-sm shadow-xl hover:border-purple-400/40 transition-all duration-300 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-violet-900/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />

      <span className="text-4xl">{achievement.emoji}</span>
      <div className="text-center">
        <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
          {count}{achievement.suffix}
        </div>
        <div className="text-sm font-semibold text-white mt-1">{achievement.label}</div>
        <div className="text-xs text-slate-400 mt-1 max-w-32 mx-auto leading-relaxed">{achievement.description}</div>
      </div>
    </motion.div>
  );
}
export default function AchievementsSection({ achievements }: AchievementsProps) {
  return (
    <section id="achievements" className="relative py-24 bg-[#0a0a14]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
      <div className="w-full max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Milestones</h2>
          <p className="text-slate-400 mt-4">Numbers that tell the story of relentless curiosity and cross-disciplinary work.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {achievements.map((achievement, i) => (
            <CounterCard key={achievement.id} achievement={achievement} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}