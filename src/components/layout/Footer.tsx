import { Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-earth-light dark:border-forest-dark/30 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-ink-muted dark:text-parchment-muted">
          © {new Date().getFullYear()} Jon Deiss · Arlington, VA
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/jonathan-deiss"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-muted dark:text-parchment-muted hover:text-forest-mid dark:hover:text-forest-light transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://www.github.com/jdeiss55"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-muted dark:text-parchment-muted hover:text-forest-mid dark:hover:text-forest-light transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
