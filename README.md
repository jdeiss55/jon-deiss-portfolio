# Jon Deiss — Portfolio

Personal portfolio site built with Next.js 14, Tailwind CSS, Framer Motion, and the Anthropic Claude API.

Features two live AI agents:
- **Ask Jon** — a streaming chat assistant that answers questions about Jon's background in first person
- **Role Fit Analyzer** — paste a job description, get a structured fit assessment with strengths, gaps, and interview talking points

## Quick Start

### 1. Clone / copy the project

```bash
cd portfolio
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in:

```env
ANTHROPIC_API_KEY=your_key_here
NEXT_PUBLIC_FORMSPREE_ID=your_formspree_id  # optional
```

Get your Anthropic API key at [console.anthropic.com](https://console.anthropic.com).

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts
│   ├── page.tsx            # Home page — composes all sections
│   ├── globals.css         # Tailwind base + custom utilities
│   └── api/
│       ├── chat/route.ts   # Streaming chat API (Ask Jon)
│       └── analyze/route.ts # Role fit analysis API
├── components/
│   ├── Providers.tsx       # next-themes ThemeProvider
│   ├── layout/
│   │   ├── Header.tsx      # Sticky nav with mobile menu + theme toggle
│   │   └── Footer.tsx
│   ├── sections/           # One file per page section
│   │   ├── Hero.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── AIAgents.tsx    # Hosts both AI agent components
│   │   ├── Blog.tsx
│   │   └── Contact.tsx     # Formspree-wired contact form
│   ├── agents/
│   │   ├── AskJon.tsx      # Streaming chat UI
│   │   └── RoleFitAnalyzer.tsx # JD input + structured results
│   └── ui/
│       ├── ThemeToggle.tsx  # Dark/light toggle
│       └── AnimatedSection.tsx # Framer Motion scroll wrapper
├── data/                   # Edit these to update content
│   ├── experience.ts       # Work history entries
│   ├── projects.ts         # Project cards
│   ├── skills.ts           # Skill categories + certifications
│   └── blog.ts             # Blog post metadata
├── lib/
│   └── prompts.ts          # AI system prompts + MODEL constant
└── types/
    └── index.ts            # Shared TypeScript interfaces
```

---

## Content Customization

### Work Experience
Edit [`src/data/experience.ts`](src/data/experience.ts). Each entry is an `ExperienceEntry` object:

```typescript
{
  id: 'unique-id',
  company: 'Company Name',
  role: 'Your Role',
  period: '2020 – Present',
  location: 'City, ST',
  description: 'One-line summary',
  bullets: ['Achievement 1', 'Achievement 2'],
  tags: ['Skill', 'Tool'],
}
```

### Projects
Edit [`src/data/projects.ts`](src/data/projects.ts). Set `placeholder: true` for cards that are "coming soon."

### Skills & Certifications
Edit [`src/data/skills.ts`](src/data/skills.ts). Add categories, skills, and certifications. Certification status is `'Earned'` or `'In Progress'`.

### Blog Posts
Edit [`src/data/blog.ts`](src/data/blog.ts). Set `placeholder: true` for drafts (shows "Coming soon" instead of a read link).

### AI Agent System Prompts
Edit [`src/lib/prompts.ts`](src/lib/prompts.ts). Both system prompts live here alongside the `MODEL` constant. Update the background facts whenever your situation changes.

### Change the AI Model
In `src/lib/prompts.ts`, update the `MODEL` constant:
```typescript
export const MODEL = 'claude-sonnet-4-20250514';
```

---

## Contact Form

The contact form uses [Formspree](https://formspree.io). Sign up, create a form, and set `NEXT_PUBLIC_FORMSPREE_ID` in `.env.local` to your form ID.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Dark mode | next-themes |
| Icons | lucide-react |
| AI | Anthropic Claude API (`@anthropic-ai/sdk`) |
| Contact | Formspree |
| Language | TypeScript |
