export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface RoleFitResult {
  fitScore: 'Strong' | 'Moderate' | 'Partial';
  summary: string;
  strengths: string[];
  gaps: string[];
  talkingPoints: string[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  tags: string[];
}

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  caption?: string;
}

export interface ProjectDetail {
  overview: string;
  media: MediaItem[];
  lessonsLearned: string[];
  nextSteps: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  placeholder?: boolean;
  requestAccess?: boolean;
  detail?: ProjectDetail;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  status: 'Earned' | 'In Progress' | 'Scheduled';
  year?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  body?: string;
  date: string;
  tags: string[];
  slug: string;
  placeholder?: boolean;
}
