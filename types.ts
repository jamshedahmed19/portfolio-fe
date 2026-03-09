export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  year: string;
  link?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface TechItem {
  name: string;
  icon: string; // Key for Lucide icon mapping
  color?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  iconClass: string;
  label: string;
}

export interface NavItem {
  label: string;
  href: string;
}