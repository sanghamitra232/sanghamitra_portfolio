'use client';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import type { Project } from '@/app/types';
import AudioButton from '@/app/components/ui/AudioButton';
import { FiExternalLink, FiGithub, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface ProjectsProps {
  projects: Project[];
}

const STATUS_COLORS: Record<string, string> = {
  'Completed': '#10b981',
  'In Development': '#f59e0b',
  'Concept': '#8b5cf6',
  'Ongoing': '#3b82f6',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isEven = index % 2 === 0;
  const statusColor = STATUS_COLORS[project.status] || '#6b7280';

  return (
    <div className="grid grid-cols-[1fr_40px_1fr] items-start gap-0">

      {/* LEFT COLUMN */}
      <div className="pr-8">
        {isEven && (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden border border-purple-500/20 bg-purple-950/20 shadow-xl" style={{ height: 300 }}>
              {project.image ? (
                <Image src={project.image} alt={project.title} fill className="object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-purple-900/40 to-violet-900/40">🚀</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 left-8 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-purple-500/30 text-xs text-purple-300 font-medium">{project.year}</div>
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border" style={{ backgroundColor: statusColor + '25', borderColor: statusColor + '60', color: statusColor }}>{project.status}</div>
            </div>
          </motion.div>
        )}
        {!isEven && (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="pt-2"
          >
            <span className="text-xs text-purple-400 uppercase tracking-widest font-medium">{project.category}</span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-3">{project.title}</h3>
            <p className={`text-slate-400 leading-relaxed text-sm ${expanded ? '' : 'line-clamp-3'}`}>{project.description}</p>
            <button onClick={() => setExpanded(!expanded)} className="mt-2 text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
              {expanded ? <><FiChevronUp size={12}/> Less</> : <><FiChevronDown size={12}/> Read More</>}
            </button>
            <div className="flex flex-wrap gap-3 mt-4">
              {project.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-purple-900/40 text-purple-300 border border-purple-700/30">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-8 flex-wrap">
              {project.audio && <AudioButton src={project.audio} label="Hear Story" />}
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition-all"><FiExternalLink size={13}/> Live</a>}
              {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition-all"><FiGithub size={13}/> Code</a>}
            </div>
          </motion.div>
        )}
      </div>

      {/* CENTER DOT */}
      <div className="flex flex-col items-center pt-5 z-10">
        <motion.div
          whileInView={{ scale: [0, 1.4, 1] }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-4 h-4 rounded-full border-2 border-purple-400 bg-purple-900 shadow-lg shadow-purple-900/60 flex-shrink-0"
        />
      </div>

      {/* RIGHT COLUMN */}
      <div className="pl-8">
        {isEven && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="pt-2"
          >
            <span className="text-xs text-purple-400 uppercase tracking-widest font-medium">{project.category}</span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-3">{project.title}</h3>
            <p className={`text-slate-400 leading-relaxed text-sm ${expanded ? '' : 'line-clamp-3'}`}>{project.description}</p>
            <button onClick={() => setExpanded(!expanded)} className="mt-2 text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
              {expanded ? <><FiChevronUp size={12}/> Less</> : <><FiChevronDown size={12}/> Read More</>}
            </button>
            <div className="flex flex-wrap gap-3 mt-4">
              {project.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-full text-xs bg-purple-900/40 text-purple-300 border border-purple-700/30">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-3 mt-8 flex-wrap">
              {project.audio && <AudioButton src={project.audio} label="Hear Story" />}
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition-all"><FiExternalLink size={13}/> Live</a>}
              {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition-all"><FiGithub size={13}/> Code</a>}
            </div>
          </motion.div>
        )}
        {!isEven && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="relative w-full rounded-2xl overflow-hidden border border-purple-500/20 bg-purple-950/20 shadow-xl" style={{ height: 300 }}>
              {project.image ? (
                <Image src={project.image} alt={project.title} fill className="object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-purple-900/40 to-violet-900/40">🚀</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-purple-500/30 text-xs text-purple-300 font-medium">{project.year}</div>
              <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border" style={{ backgroundColor: statusColor + '25', borderColor: statusColor + '60', color: statusColor }}>{project.status}</div>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
}

export default function ProjectsSection({ projects }: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <section id="projects" ref={containerRef} className="relative py-24 bg-[#0a0a14]">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/5 to-transparent" />

      <div className="w-full max-w-7xl mx-auto px-8">
        <div className="text-center mb-20 w-full flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Projects</h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto" style={{ maxWidth: '1000px' }}>Each project is a chapter in an ongoing story of building things that matter at the intersection of food, technology, and creativity.</p>
        </div>

        <div className="relative">
          {/* Animated vertical road line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-purple-500 via-violet-600 to-fuchsia-600"
              style={{ height: '100%', scaleY: pathLength, transformOrigin: 'top' }}
            />
          </div>
          {/* Glow */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-4 -ml-2 blur-sm opacity-20 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-b from-purple-500 to-violet-600" />
          </div>

          <div className="flex flex-col gap-16 py-8">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
