import { readFileSync } from 'fs';
import { join } from 'path';
import dynamic from 'next/dynamic';

import type {
  PersonalData,
  Skill,
  Project,
  Internship,
  Certification,
  IndustrialExposure,
  Achievement,
} from '@/app/types';

import HeroSection from '@/app/components/sections/HeroSection';
import ResearchSection from '@/app/components/sections/ResearchSection';
import SkillsSection from '@/app/components/sections/SkillsSection';
import ProjectsSection from '@/app/components/sections/ProjectsSection';
import InternshipsSection from '@/app/components/sections/InternshipsSection';
import IndustrialSection from '@/app/components/sections/IndustrialSection';
import CertificationsSection from '@/app/components/sections/CertificationsSection';
import AchievementsSection from '@/app/components/sections/AchievementsSection';
import ContactSection from '@/app/components/sections/ContactSection';
import Navbar from '@/app/components/ui/Navbar';
import GlobalAudioController from '@/app/components/ui/GlobalAudioController';

function readData<T>(filename: string): T {
  const filePath = join(process.cwd(), 'data', filename);
  const raw = readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export default function Home() {
  const personal = readData<PersonalData>('personal.json');
  const skills = readData<Skill[]>('skills.json');
  const projects = readData<Project[]>('projects.json');
  const internships = readData<Internship[]>('internships.json');
  const certifications = readData<Certification[]>('certifications.json');
  const industrial = readData<IndustrialExposure[]>('industrial.json');
  const achievements = readData<Achievement[]>('achievements.json');

  return (
    <main className="min-h-screen bg-[#0a0a14] text-white">
      <Navbar />
      <GlobalAudioController />
      <HeroSection personal={personal} />
      <ResearchSection personal={personal} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <InternshipsSection internships={internships} />
      <IndustrialSection exposures={industrial} />
      <CertificationsSection certifications={certifications} />
      <AchievementsSection achievements={achievements} />
      <ContactSection personal={personal} />
    </main>
  );
}
