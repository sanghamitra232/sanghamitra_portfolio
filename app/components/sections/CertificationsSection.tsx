'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { Certification } from '@/app/types';

interface CertsProps {
  certifications: Certification[];
}

function PushPin({ color }: { color: string }) {
  return (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
      <div className="w-5 h-5 rounded-full shadow-md border-2 border-white/20"
        style={{ backgroundColor: color }} />
      <div className="w-1 h-3 bg-gray-400 rounded-b-sm" />
    </div>
  );
}

function CertCard({ cert, index, onClick }: {
  cert: Certification;
  index: number;
  onClick: () => void;
}) {
  const rotations = [-3, 2, -1, 3, -2, 1, -3, 2];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: -40, rotate: rotation }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.08, rotate: 0, zIndex: 20 }}
      onClick={onClick}
      className="relative cursor-pointer"
    >
      <PushPin color="#ef4444" />
      <div
        className="rounded-lg overflow-hidden shadow-xl border-4 border-white/90 pt-4"
        style={{
          background: `linear-gradient(135deg, ${cert.color}15, ${cert.color}08)`,
          borderColor: 'rgba(255,255,255,0.85)',
          boxShadow: `4px 6px 20px rgba(0,0,0,0.5), 0 0 0 1px ${cert.color}30`,
        }}
      >
        {/* Certificate image / placeholder */}
        <div className="relative w-full bg-white/5" style={{ height: 140 }}>
          {cert.image ? (
            <Image src={cert.image} alt={cert.title} fill className="object-cover" />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}10)` }}
            >
              <div className="text-4xl">🏅</div>
            </div>
          )}
        </div>

        {/* Card content */}
        <div className="p-3 bg-amber-50/5">
          <p className="text-xs font-bold text-white leading-tight">{cert.title}</p>
          <p className="text-xs text-slate-400 mt-0.5">{cert.issuer}</p>
          <p className="text-xs text-slate-500 mt-0.5">{cert.year}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function CertificationsSection({ certifications }: CertsProps) {
  const [selected, setSelected] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="relative py-24 bg-[#0a0a14]">
      <div className="w-full max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-amber-400 text-sm tracking-widest uppercase font-medium">Wall of Achievement</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Certifications</h2>
          <p className="text-slate-400 mt-4">Click any certificate to view it in full.</p>
        </motion.div>

        {/* Cork board */}
        <div
          className="relative rounded-3xl p-8 md:p-12"
          style={{
            background: 'repeating-linear-gradient(45deg, #3d2b1f 0px, #3d2b1f 2px, #4a3525 2px, #4a3525 10px)',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5), 0 8px 40px rgba(0,0,0,0.6)',
            border: '12px solid #2a1a10',
          }}
        >
          {/* Board frame */}
          <div className="absolute inset-3 rounded-2xl pointer-events-none"
            style={{ border: '2px solid rgba(255,255,255,0.05)' }} />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-10">
            {certifications.map((cert, i) => (
              <CertCard
                key={cert.id}
                cert={cert}
                index={i}
                onClick={() => setSelected(cert)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative max-w-lg w-full bg-[#1a0a2e] rounded-3xl border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-900/40"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ height: 280 }}>
                {selected.image ? (
                  <Image src={selected.image} alt={selected.title} fill className="object-cover" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-7xl"
                    style={{ background: `linear-gradient(135deg, ${selected.color}30, ${selected.color}10)` }}
                  >
                    🏅
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white">{selected.title}</h3>
                <p className="text-purple-400 mt-1 font-medium">{selected.issuer} · {selected.year}</p>
                <p className="text-slate-400 mt-4 text-sm leading-relaxed">{selected.description}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors text-sm"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
