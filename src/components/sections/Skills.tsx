import type { ElementType } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { skillCategories, certifications } from '@/data/skills';
import { CheckCircle, Clock, CalendarClock } from 'lucide-react';
import type { Certification } from '@/types';

const STATUS_CONFIG: Record<
  Certification['status'],
  { icon: ElementType; className: string }
> = {
  Earned: {
    icon: CheckCircle,
    className: 'bg-forest-light/25 text-ink-badge dark:text-forest-light border border-forest-light/40',
  },
  'In Progress': {
    icon: Clock,
    className: 'bg-earth-light/20 text-earth-dark dark:text-earth-light border border-earth-light/40',
  },
  Scheduled: {
    icon: CalendarClock,
    className: 'bg-earth-tan/15 text-earth-dark dark:text-earth-tan border border-earth-tan/30 dark:border-earth-tan/20',
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-linen dark:bg-moss-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink-heading dark:text-parchment-heading mb-2">Skills & Certifications</h2>
          <p className="text-ink-muted dark:text-parchment-muted mb-12">What I bring to the table, and what I&apos;m adding to it.</p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills */}
          <div>
            <AnimatedSection>
              <h3 className="text-sm font-semibold text-forest-mid dark:text-forest-light mb-6 uppercase tracking-wider">
                Technical Skills
              </h3>
            </AnimatedSection>
            <div className="space-y-6">
              {skillCategories.map((cat, index) => (
                <AnimatedSection key={cat.category} delay={index * 0.08}>
                  <div>
                    <h4 className="text-sm font-medium text-ink-body dark:text-parchment-body mb-2.5">{cat.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-sm px-3 py-1.5 rounded-lg bg-offwhite dark:bg-moss-surface text-ink-body dark:text-parchment-body border border-earth-light dark:border-forest-dark/30 hover:border-forest-mid/50 dark:hover:border-forest-light/40 hover:text-forest-mid dark:hover:text-forest-light transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <AnimatedSection>
              <h3 className="text-sm font-semibold text-forest-mid dark:text-forest-light mb-6 uppercase tracking-wider">
                Certifications
              </h3>
            </AnimatedSection>
            <div className="space-y-4">
              {certifications.map((cert, index) => {
                const config = STATUS_CONFIG[cert.status];
                const Icon = config.icon;
                return (
                  <AnimatedSection key={cert.name} delay={index * 0.08}>
                    <div className="card-glass rounded-xl p-5 flex items-center justify-between gap-4 hover:border-forest-mid/40 dark:hover:border-forest-light/30 transition-all duration-200">
                      <div>
                        <p className="text-ink-heading dark:text-parchment-heading font-semibold text-sm leading-snug">{cert.name}</p>
                        <p className="text-ink-muted dark:text-parchment-muted text-xs mt-1">{cert.issuer}</p>
                      </div>
                      <div className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full flex-shrink-0 ${config.className}`}>
                        <Icon size={12} />
                        {cert.status}
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection delay={0.5} className="mt-8">
              <div className="card-glass rounded-xl p-5 border-forest-mid/20">
                <p className="text-sm text-ink-body dark:text-parchment-body leading-relaxed">
                  <span className="text-forest-mid dark:text-forest-light font-medium">Education: </span>
                  B.S. in Systems and Information Science, Syracuse University. Concentrations in
                  Database Management and Web Design.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
