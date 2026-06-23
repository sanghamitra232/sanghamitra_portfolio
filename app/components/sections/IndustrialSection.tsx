'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { IndustrialExposure } from '@/app/types';
import AudioButton from '@/app/components/ui/AudioButton';
import { FiMapPin, FiCalendar, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface IndustrialProps {
  exposures: IndustrialExposure[];
}

export default function IndustrialSection({ exposures }: IndustrialProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="industrial" className="relative py-24 bg-[#0a0a14]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/5 to-transparent" />

      <div className="w-full max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Industrial Exposure</h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto" style={{maxWidth:'1300px'}}>Factory floors and accredited labs, where the textbook becomes the machine.</p>
        </motion.div>

        <div className="flex flex-col gap-8">
          {exposures.map((exposure, i) => (
            <motion.div
              key={exposure.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-3xl border border-emerald-500/20 bg-emerald-950/10 overflow-hidden backdrop-blur-sm shadow-xl shadow-emerald-900/10"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="relative md:w-80 h-56 md:h-auto flex-shrink-0">
                  {exposure.image ? (
                    <Image src={exposure.image} alt={exposure.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-emerald-900/40 to-teal-900/40 min-h-56">
                      🏭
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40 hidden md:block" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mt-1">{exposure.title}</h3>
                      <p className="text-emerald-400/80 text-sm font-medium mt-0.5">{exposure.organization}</p>
                    </div>
                    <div className="text-left text-xs text-slate-500 flex flex-col gap-1">
                      <span className="flex items-center gap-3"><FiCalendar size={10}/>{exposure.year}</span>
                      <span className="flex items-center gap-2"><FiMapPin size={10}/>{exposure.location}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-slate-400 text-sm leading-relaxed">{exposure.shortDescription}</p>

                  <AnimatePresence>
                    {expandedId === exposure.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-slate-300 text-sm leading-relaxed">{exposure.fullDescription}</p>
                        <div className="mt-4">
                          <p className="text-xs text-emerald-400 uppercase tracking-wider font-medium mb-3">Key Learnings</p>
                          <ul className="space-y-5">
                            {exposure.keyLearnings.map((learning, idx) => (
                              <li key={idx} className="flex items-start gap-4 text-sm text-slate-300">
                                <span className="text-emerald-400 mt-0.5">▸</span>
                                {learning}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-4 mt-5 flex-wrap">
                    <button
                      onClick={() => setExpandedId(expandedId === exposure.id ? null : exposure.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/40 text-emerald-300 text-sm hover:bg-emerald-900/30 transition-all"
                    >
                      {expandedId === exposure.id
                        ? <><FiChevronUp size={13}/> Less Details</>
                        : <><FiChevronDown size={13}/> Expand Details</>
                      }
                    </button>
                    {exposure.audio && <AudioButton src={exposure.audio} label="Hear" />}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
