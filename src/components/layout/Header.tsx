'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', target: 'about' },
  { label: 'Experience', target: 'experience' },
  { label: 'Projects', target: 'projects' },
  { label: 'Skills', target: 'skills' },
  { label: 'AI Agents', target: 'ai-agents' },
  { label: 'Blog', target: 'writing' },
  { label: 'Contact', target: 'contact' },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 dark:bg-moss/95 backdrop-blur-md border-b border-earth-light dark:border-forest-dark/40 shadow-sm shadow-earth-light/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollToSection('about')}
            className="font-bold text-lg text-ink-heading dark:text-parchment-heading hover:text-forest-mid dark:hover:text-forest-light transition-colors"
          >
            Jon<span className="text-forest-mid">.</span>Deiss
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToSection(link.target)}
                className="px-3 py-2 text-sm text-ink-heading dark:text-parchment-body hover:text-forest-hover dark:hover:text-forest-light transition-colors rounded-lg hover:bg-linen/60 dark:hover:bg-moss-secondary/60"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="md:hidden p-2 text-ink-muted dark:text-parchment-muted hover:text-forest-mid dark:hover:text-forest-light transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden bg-cream/98 dark:bg-moss/98 border-t border-earth-light dark:border-forest-dark/40 py-4">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => { scrollToSection(link.target); setMenuOpen(false); }}
                className="block w-full text-left px-4 py-2.5 text-sm text-ink-heading dark:text-parchment-body hover:text-forest-hover dark:hover:text-forest-light hover:bg-linen/60 dark:hover:bg-moss-secondary/60 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
