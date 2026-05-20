import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { MapPin, Linkedin, Github, ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Headshot */}
          <AnimatedSection delay={0.1} className="flex-shrink-0">
            <div className="relative">
              <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-2xl overflow-hidden border border-earth-light dark:border-forest-dark/40 shadow-xl shadow-earth-light/40 dark:shadow-moss-secondary/40">
                <Image
                  src="/headshot.jpg"
                  alt="Jon Deiss"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-forest-mid rounded-full w-5 h-5 animate-pulse" />
            </div>
          </AnimatedSection>

          {/* Text content */}
          <div className="text-center lg:text-left">
            <AnimatedSection delay={0.15}>
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-badge dark:text-forest-light bg-forest-light/25 dark:bg-forest-dark/30 border border-forest-light/50 dark:border-forest-dark/50 px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-mid dark:bg-forest-light animate-pulse" />
                  Available for opportunities
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted dark:text-parchment-muted">
                  <MapPin size={12} />
                  Arlington, VA
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-heading dark:text-parchment-heading mb-3 leading-tight">
                Jon Deiss
              </h1>
              <div className="w-[60px] h-[3px] rounded-[2px] mb-4 bg-gradient-to-r from-forest-mid to-forest-hover" />
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <p className="text-xl sm:text-2xl font-medium text-gradient mb-6">
                Software Implementation Expert
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-ink-body dark:text-parchment-body text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                4+ years leading enterprise digital transformations at EY. Now channeling that software
                implementation experience into product and solutions roles to help organizations become
                more efficient and dive into AI implementation.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.35}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <a
                  href="#projects"
                  className="px-6 py-3 btn-primary"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 btn-secondary"
                >
                  Let&apos;s Connect
                </a>
                <a
                  href="https://www.linkedin.com/in/jonathan-deiss"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-ink-muted dark:text-parchment-muted hover:text-forest-mid dark:hover:text-forest-light bg-offwhite dark:bg-moss-surface hover:bg-linen dark:hover:bg-moss-secondary rounded-lg border border-earth-light dark:border-forest-dark/40 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://www.github.com/jdeiss55"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-ink-muted dark:text-parchment-muted hover:text-forest-mid dark:hover:text-forest-light bg-offwhite dark:bg-moss-surface hover:bg-linen dark:hover:bg-moss-secondary rounded-lg border border-earth-light dark:border-forest-dark/40 transition-all duration-200"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Scroll indicator */}
        <AnimatedSection delay={0.5} className="flex justify-center mt-20">
          <a href="#experience" className="text-ink-muted dark:text-parchment-muted hover:text-forest-mid dark:hover:text-forest-light transition-colors animate-bounce">
            <ArrowDown size={24} />
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
