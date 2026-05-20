import type { SkillCategory, Certification } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages & Markup',
    skills: ['HTML', 'CSS', 'JavaScript', 'SQL', 'Python'],
  },
  {
    category: 'Platforms & Tools',
    skills: ['Enablon', 'NABSIC / Intelex', 'Salesforce', 'Jira', 'Confluence', 'SharePoint'],
  },
  {
    category: 'Data & Databases',
    skills: ['SQL Validation', 'Data Migration', 'Database Mapping', 'ETL Workflows', 'Data Quality Assurance'],
  },
  {
    category: 'AI & Emerging Tech',
    skills: ['Large Language Models (LLMs)', 'Anthropic Claude API', 'Prompt Engineering', 'AI Product Concepts'],
  },
  {
    category: 'Consulting & Leadership',
    skills: [
      'Stakeholder Management',
      'Executive Workshops',
      'Requirements Gathering',
      'Offshore Team Coordination',
      'Digital Transformation',
      'Project Management',
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: 'Claude 101',
    issuer: 'Anthropic',
    status: 'Earned',
  },
  {
    name: 'Claude Code 101',
    issuer: 'Anthropic',
    status: 'Earned',
  },
  {
    name: 'Google AI Essentials',
    issuer: 'Google',
    status: 'Earned',
  },
  {
    name: 'Microsoft Azure AI Fundamentals (AI-900)',
    issuer: 'Microsoft',
    status: 'In Progress',
  },
  {
    name: 'AWS AI Practitioner',
    issuer: 'Amazon Web Services',
    status: 'In Progress',
  },
  {
    name: 'Codex 102: Practical Workflow',
    issuer: 'Anthropic',
    status: 'Scheduled',
  },
];
