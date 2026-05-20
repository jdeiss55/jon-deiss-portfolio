import type { ProjectEntry } from '@/types';

export const projects: ProjectEntry[] = [
  {
    id: 'job-tracker',
    title: 'Job Quest - Application Tracker and Organizer',
    description:
      'A personal productivity tool for organizing job applications throughout the search process. Tracks companies, roles, interview stages, follow-up dates, and notes in one structured fantasy game-ified view.',
    tags: ['Python', 'SQL', 'Productivity', 'Personal Tools', 'Gamification'],
    detail: {
      // TODO: Write 2-3 sentences describing the project purpose, why you built it, and the problem it solves
      overview:
        'Job Quest is a gamified job-search hub that turns the application grind into a single-player RPG. You create a character, bind your résumé to unlock a D&D-style class and ability scores, then spawn into a pixel-art town where every building is a feature. The Quest Board surfaces AI-scored job listings and drafts tailored cover letters. The Rookery watches your inbox over IMAP and uses Claude to auto-update application statuses and surface new opportunities from ATS confirmation emails. Your Home tracks every application and its full history. The reward system is built around consistency, not outcomes: gold flows from the act of applying, day after day, with streak bonuses and daily stacking multipliers. Built with Next.js 14, Phaser 3, TypeScript, and the Claude API.',
      // TODO: Add media — { type: 'image', src: '/projects/job-tracker-1.png', caption: '...' }
      media: [
        { type: 'image', src: '/projects/jobquest-main.png', caption: 'Home Screen with Interactive Elements' },
        { type: 'image', src: '/projects/jobquest-start.png', caption: 'Create your Character Screen' },
        { type: 'image', src: '/projects/jobquest-board.png', caption: 'Quest Board/Application Search' },
      ],
      // TODO: List 2-4 key takeaways from building this project — what surprised you, what you learned, what you'd do differently
      lessonsLearned: ['Learned how to integrate the Anthropic Claude API for both content generation and email parsing.', 'Gained experience building a more complex Next.js app with multiple pages, a custom backend API, and a non-trivial data model.', 'Had fun designing a gamified user experience that turns a stressful process into something more engaging.'],
      // TODO: List planned next features or improvements you're considering
      nextSteps: ['Continue building out the UI/UX experience, still using placeholder models.', 'Add more features such as streak freeze potions, a shop to spend gold on fun cosmetic items, and more.', 'Continue to monitor the app for any bugs or issues and fix as needed.'],
    },
  },
  {
    id: 'ai-portfolio',
    title: 'AI Powered Portfolio',
    description:
      "This site. It contains projects I’ve built, blog posts I’ve written, and more. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features two live AI agents powered by the Anthropic Claude API.",
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Anthropic API', 'Framer Motion'],
    detail: {
      // TODO: Expand this overview with more technical depth once the project is fully shipped
      overview:
        'A modern portfolio site built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Features two live AI agents powered by the Anthropic Claude API. Server-side API routes keep credentials secure and never expose keys to the client.',
      // TODO: Add media — screenshots of the site once deployed (hero, AI agents in action, mobile view)
      // Example: { type: 'image', src: '/projects/portfolio-hero.png', caption: 'Hero section' }
      media: [
        { type: 'image', src: '/projects/jd-projects.png', caption: 'Interactive Projects Section' },
        { type: 'image', src: '/projects/chat-with-jon.png', caption: 'AI Chat Interface' },
        { type: 'image', src: '/projects/lets-connect.png', caption: 'Contact Section' },
      ],
      // TODO: Write 3-4 lessons learned — good candidates: SSR + Framer Motion opacity bug, building a streaming chat UI, designing a multi-token color system
      lessonsLearned: ['Learned how to integrate AI agents into a Next.js app.', 'Learned about hosting a webpage with a custom domain and URL.', 'Practiced good UI/UX principles when designing the site and its interactions.'],
      // TODO: List what you plan to add next — blog posts, more projects, analytics, SEO improvements
      nextSteps: ['Continue to add more projects and blog posts over time.', 'Add additional features as I think of them or get feedback from users, such as analytics, SEO improvements, and more.']
    },
  },
  {
    id: 'steam-game',
    title: 'Steam Game - Project X',
    description:
      'A personal project with a small group of colleagues. Creating a game using Godot to explore game development concepts.',
    tags: ['Godot', 'C#', 'Blender 3D Modeling', 'Gaming', 'Small Team Collaboration'],
    detail: {
      // TODO: Replace this with the actual project name and description once you're ready to publish it
      overview: 'Details coming soon. The game will be based on a Pinball-style roguelike, where the player can gain upgrades to boost their score and progress through the levels.',
      // TODO: Add media
      media: [{ type: 'image', src: '/projects/project-x-blender.png', caption: 'Sample 3D Model' },],
      // TODO: Add lessons learned
      lessonsLearned: ['Learning game development concepts in Godot.', 'Learning to work collaboratively using GitHub push/pull', 'Practicing project management techniques.'],
      // TODO: Add next steps
      nextSteps: ['Currently in the early stages of development. Next steps include physics implementation from the technical team, while the creative team works on 3D models and sounds.'],
    },
  },
  {
    id: 'pinball-explainer',
    title: 'Pinball Rule Explainer App',
    description:
      'A reference app that explains the rules, scoring, and unique mechanics of specific pinball machines for players who want to understand a table quickly.',
    tags: ['JavaScript', 'Web', 'Mobile-Friendly'],
    // TODO: Replace with the real deployed URL
    liveUrl: 'https://pinball-rule-explainer.vercel.app',
    requestAccess: true,
    detail: {
      // TODO: Write the full overview — describe which machines are covered, how the UI works, and the inspiration for building it
      overview:
        'Pinball Rule Explainer is an AI-powered web app that lets you upload a PDF rule sheet for any pinball machine and ask questions about it in plain English. Instead of digging through dense, jargon-heavy documentation, you just ask things like "How do I start multiball?" or "What\'s the fastest path to wizard mode?" and get a clear, conversational answer. Built as a Progressive Web App using React and Vite, with the Anthropic API handling the document understanding under the hood.',
      // TODO: Add media — { type: 'image', src: '/projects/pinball-1.png', caption: '...' }
      media: [
        { type: 'image', src: '/projects/pinball-front-page.png', caption: 'Front Page' },
        { type: 'image', src: '/projects/pinball-chat.png', caption: 'Chat with the AI' },
        { type: 'image', src: '/projects/pinball-feature-suggest.png', caption: 'Feature Suggestion Form' },
      ],
      // TODO: Add lessons learned
      lessonsLearned: ['Learned about hosting with Vercel, building a simple React app with Vite, and integrating the Anthropic API for document understanding.', 'Refreshed git push/pull workflow skills.'],
      // TODO: Add next steps — e.g., more machines, search, community rules contributions
      nextSteps: ['Continue to monitor for any requests for improvements or bugs to fix.', 'Add more machines manually, or design a way for the site to pull the latest rulesheets automatically (e.g., updating from Star Wars 0.91 to Star Wars 0.95 code).'],
    },
  },
  {
    id: 'dnd-dm-screen',
    title: 'D&D Dungeon Master Screen',
    description:
      'A self-contained web app for tabletop RPG Dungeon Masters. Tracks HP, ability scores, AC, initiative order, spell slots, conditions, and DM notes, all in a single HTML file with zero dependencies.',
    tags: ['HTML', 'Vue 3', 'CSS', 'Vanilla JS'],
    detail: {
      // TODO: Write a deeper overview — mention the no-build-step design philosophy, Vue 3 CDN approach, and what made this fun to build
      overview:
        'A zero-dependency, single-file web app for tabletop RPG Dungeon Masters. Built with Vue 3 loaded via CDN and plain CSS. No build step required. Designed to run offline or drop onto any static host instantly.',
      media: [
        // TODO: Replace with real files — drop .mp4 or .webm into public/projects/ and update src paths
        { type: 'video', src: '/projects/dnd-demo.mp4', caption: 'Video Walkthrough' },
        // TODO: Replace with a real screenshot — drop .png or .jpg into public/projects/ and update src path
        { type: 'image', src: '/projects/dnd-screenshot.png', caption: 'Characters in Action' },
      ],
      // TODO: Add lessons learned — candidates: Vue 3 CDN patterns, reactive state without Pinia, designing for offline use
      lessonsLearned: ['Learned how to build a simple HTML site without needing external hosting. The original design was meant to be more automated and attempted to scrape data from DNDbeyond.com, but they unfortunately block that kind of action.'],
      // TODO: Add next steps — e.g., character sheets, encounter builder, initiative roller, mobile layout improvements
      nextSteps: ['Continue to modify the design to add features for my own personal use and attempt to create an automatic feed from character sheet directly to the app.'],
    },
  },
  {
    id: 'coming-soon',
    title: 'Coming Soon',
    description:
      'More projects in the pipeline. Stay tuned.',
    tags: ['TBD'],
    placeholder: true,
  },
];
