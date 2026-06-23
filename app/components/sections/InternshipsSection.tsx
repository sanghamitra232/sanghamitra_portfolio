'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import type { Internship } from '@/app/types';
import AudioButton from '@/app/components/ui/AudioButton';
import { FiMapPin, FiCalendar } from 'react-icons/fi';

interface InternshipsProps {
  internships: Internship[];
}

export default function InternshipsSection({ internships }: InternshipsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section id="internships" ref={containerRef} className="relative py-24 bg-[#0a0a14]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/5 to-transparent" />

      <div className="w-full max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Internships</h2>
          <p className="text-slate-300 mt-10 max-w-xl mx-auto" style={{maxWidth:'1300px'}}>Real-world exposure where theory met practice, and every process line told a story.</p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-blue-500 via-cyan-500 to-teal-500"
              style={{ height: '100%', scaleY: pathLength, transformOrigin: 'top' }}
            />
          </div>

          <div className="flex flex-col gap-16 py-8">
            {internships.map((internship, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={internship.id} className="grid grid-cols-[1fr_40px_1fr] items-start gap-0">

                  {/* LEFT COLUMN */}
                  <div className="pr-8">
                    {isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="relative w-full rounded-2xl overflow-hidden border border-blue-500/20 bg-blue-950/20 shadow-xl flex items-center justify-center" style={{ height: 300 }}>
                          {internship.companyLogo ? (
                            <Image src={internship.companyLogo} alt={internship.company} fill className="object-contain" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
                              <span className="text-5xl">🏢</span>
                              <span className="text-sm text-blue-300 font-medium">{internship.company}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                        className="pt-2"
                      >
                        <h3 className="text-xl font-bold text-white">{internship.title}</h3>
                        <p className="text-blue-400 font-medium mt-0.5">{internship.company}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><FiCalendar size={11}/>{internship.duration}</span>
                          <span className="flex items-center gap-1"><FiMapPin size={11}/>{internship.location}</span>
                        </div>
                        <p className="mt-4 text-slate-200 leading-relaxed text-sm">{internship.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {internship.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-blue-900/40 text-blue-300 border border-blue-700/30">{tag}</span>
                          ))}
                        </div>
                        {internship.audio && <div className="mt-4"><AudioButton src={internship.audio} label="Hear About It" /></div>}
                      </motion.div>
                    )}
                  </div>

                  {/* CENTER DOT */}
                  <div className="flex flex-col items-center pt-5 z-10">
                    <motion.div
                      whileInView={{ scale: [0, 1.4, 1] }}
                      viewport={{ once: true }}
                      className="w-4 h-4 rounded-full border-2 border-blue-400 bg-blue-900 shadow-lg flex-shrink-0"
                    />
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="pl-8">
                    {isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                        className="pt-2"
                      >
                        <h3 className="text-xl font-bold text-white">{internship.title}</h3>
                        <p className="text-blue-400 font-medium mt-0.5">{internship.company}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><FiCalendar size={11}/>{internship.duration}</span>
                          <span className="flex items-center gap-1"><FiMapPin size={11}/>{internship.location}</span>
                        </div>
                        <p className="mt-4 text-slate-400 leading-relaxed text-sm">{internship.description}</p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {internship.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-blue-900/40 text-blue-300 border border-blue-700/30">{tag}</span>
                          ))}
                        </div>
                        {internship.audio && <div className="mt-4"><AudioButton src={internship.audio} label="Hear About It" /></div>}
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.6 }}
                      >
                        <div className="relative w-full rounded-2xl overflow-hidden border border-blue-500/20 bg-blue-950/20 shadow-xl flex items-center justify-center" style={{ height: 300 }}>
                          {internship.companyLogo ? (
                            <Image src={internship.companyLogo} alt={internship.company} fill className="object-contain" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
                              <span className="text-5xl">🏢</span>
                              <span className="text-sm text-blue-300 font-medium">{internship.company}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
