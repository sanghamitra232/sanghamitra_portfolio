'use client';
import { motion } from 'framer-motion';
import type { PersonalData } from '@/app/types';
import { FiLinkedin, FiGithub, FiMail, FiDownload, FiMessageCircle, FiFolder } from 'react-icons/fi';
import AudioButton from '@/app/components/ui/AudioButton';

interface ContactProps {
  personal: PersonalData;
}

const SOCIAL_LINKS = (personal: PersonalData) => [
  {
    icon: <FiLinkedin size={20} />,
    label: 'LinkedIn',
    href: personal.linkedin,
    color: '#0A66C2',
    description: 'Connect professionally',
  },
  {
    icon: <FiGithub size={20} />,
    label: 'GitHub',
    href: personal.github,
    color: '#6e5494',
    description: 'See my repositories',
  },
  {
    icon: <FiMail size={20} />,
    label: 'Email',
    href: `mailto:${personal.email}`,
    color: '#EA4335',
    description: personal.email,
  },
  {
  icon: <FiFolder size={20} />,
  label: 'Resume',
  href: 'https://drive.google.com/file/d/1us-17q8jenLzuf8V3TUcz_dJ9BiZwf4w/view',
  color: '#d36246',
  description: 'Resume on Drive',
  },
  {
    icon: <FiMessageCircle size={20}/>,
    label: 'WhatsApp',
    href: `https://wa.me/${personal.whatsapp.replace(/\D/g, '')}`,
    color: '#25D366',
    description: 'Message directly',
  },
];

export default function ContactSection({ personal }: ContactProps) {
  const links = SOCIAL_LINKS(personal);

  return (
    <section id="contact" className="relative py-24 min-h-screen flex items-center bg-[#0a0a14]">
      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/20 to-transparent" />

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-purple-600/5 border border-purple-500/10"
            style={{
              width: 80 + i * 40,
              height: 80 + i * 40,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-7xl mx-auto px-8 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Get in Touch</h2>
          <p className="text-green-300 font-bold mt-4 max-w-xl mx-auto" style={{ maxWidth: '1300px' }}>
            Open to internships, research collaborations, and creative projects. If you&apos;re building something at the intersection of food, technology, or storytelling, let&apos;s talk.
          </p>
        </motion.div>

        <div className="flex flex-row flex-wrap justify-center gap-5">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02, x: 8 }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 shadow-lg w-28"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                  style={{ backgroundColor: link.color + '25', border: `1px solid ${link.color}40` }}
                >
                  <span style={{ color: link.color }}>{link.icon}</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-20 pt-8 border-t border-white/5"
        >
        </motion.div>
    </section>
  );
}