'use client';
import { motion } from 'framer-motion';
import type { PersonalData } from '@/app/types';
import AudioButton from '@/app/components/ui/AudioButton';

interface ResearchProps {
  personal: PersonalData;
}

const RESEARCH_AREAS = [
  {
    emoji: '🧫',
    title: 'Food Rheology',
    description: 'Rheological properties of food systems.',
  },
  {
    emoji: '🤖',
    title: 'AI in Food Systems',
    description: 'Machine learning applications for food quality prediction, adulteration detection, and supply chain traceability.',
  },
  {
    emoji: '🌿',
    title: 'Functional Foods',
    description: 'Development of foods with enhanced nutritional profiles and bioactive compounds for Indian consumers.',
  },
  {
    emoji: '📱',
    title: 'AgriTech & FoodTech',
    description: 'Digital platforms connecting farm-to-fork: transparency, allergen safety, and supply chain intelligence.',
  },
];

export default function ResearchSection({ personal }: ResearchProps) {
  return (
    <section id="research" className="relative py-24 bg-[#0a0a14]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-950/5 to-transparent" />

      <div className="w-full max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Research Interests</h2>
          <p className="text-slate-400 mt-6 max-w-xl mx-center" style={{ maxWidth: '1300px' }}>
            {personal.bio}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {RESEARCH_AREAS.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="p-6 rounded-2xl border border-pink-500/20 bg-pink-950/10 backdrop-blur-sm hover:border-pink-400/40 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{area.emoji}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{area.title}</h3>
                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">{area.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex justify-center"
        >
        </motion.div>
      </div>
    </section>
  );
}
