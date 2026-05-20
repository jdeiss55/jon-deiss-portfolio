import AnimatedSection from '@/components/ui/AnimatedSection';
import { experience } from '@/data/experience';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-linen dark:bg-moss-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink-heading dark:text-parchment-heading mb-2">Work Experience</h2>
          <p className="text-ink-muted dark:text-parchment-muted mb-12">Where I&apos;ve been, what I&apos;ve built.</p>
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-forest-mid/50 via-forest-mid/20 to-transparent hidden sm:block" />

          <div className="space-y-8">
            {experience.map((entry, index) => (
              <AnimatedSection key={entry.id} delay={index * 0.1}>
                <div className="sm:pl-16 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-6 w-4 h-4 rounded-full bg-forest-mid border-2 border-linen dark:border-moss-secondary shadow-lg shadow-forest-dark/20 hidden sm:block" />

                  <div className="card-glass rounded-2xl p-6 sm:p-8 hover:border-forest-mid/40 dark:hover:border-forest-light/30 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Briefcase size={16} className="text-forest-mid flex-shrink-0" />
                          <h3 className="text-xl font-bold text-ink-heading dark:text-parchment-heading">{entry.role}</h3>
                        </div>
                        <p className="text-forest-mid dark:text-forest-light font-semibold text-lg">{entry.company}</p>
                      </div>
                      <div className="flex flex-col sm:items-end gap-1 text-sm text-ink-muted dark:text-parchment-muted">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          {entry.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} />
                          {entry.location}
                        </span>
                      </div>
                    </div>

                    <p className="text-ink-body dark:text-parchment-body mb-4 leading-relaxed">{entry.description}</p>

                    <ul className="space-y-2 mb-5">
                      {entry.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-ink-body dark:text-parchment-body text-sm">
                          <span className="text-forest-mid dark:text-forest-light mt-1 flex-shrink-0">▸</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full bg-forest-light/20 dark:bg-forest-dark/30 text-ink-badge dark:text-forest-light border border-forest-light/40 dark:border-forest-dark/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
