export interface PersonalData {
  name: string;
  nickname: string;
  tagline: string;
  bio: string;
  location: string;
  university: string;
  degree: string;
  graduationYear: string;
  email: string;
  linkedin: string;
  github: string;
  whatsapp: string;
  resume: string;
  avatar: string;
  avatarAlt: string;
}

export interface Skill {
  id: string;
  title: string;
  emoji: string;
  icon: string;
  category: 'core' | 'digital' | 'creative';
  description: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string;
  image: string;
  audio: string;
  tags: string[];
  link: string;
  github: string;
  status: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  duration: string;
  location: string;
  description: string;
  audio: string;
  tags: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
  description: string;
  color: string;
}

export interface IndustrialExposure {
  id: string;
  title: string;
  organization: string;
  location: string;
  year: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  keyLearnings: string[];
  audio: string;
}

export interface Achievement {
  id: string;
  value: number;
  suffix: string;
  label: string;
  emoji: string;
  description: string;
}
