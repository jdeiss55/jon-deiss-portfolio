'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProjectModal from '@/components/ui/ProjectModal';
import { projects } from '@/data/projects';
import { ExternalLink, Github, Construction, ChevronRight } from 'lucide-react';
import type { ProjectEntry } from '@/types';

export default function Projects() {
  const [selected, setSelected] = useState<ProjectEntry | null>(null);

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink-heading dark:text-parchment-heading mb-2">Projects</h2>
          <p className="text-ink-muted dark:text-parchment-muted mb-12">Things I&apos;ve built, shipped, and tinkered with.</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.08}>
              <div
                className={`card-glass rounded-2xl p-6 h-full flex flex-col transition-all duration-300 ${
                  project.placeholder
                    ? 'opacity-60 border-dashed'
                    : 'hover:border-forest-mid/40 dark:hover:border-forest-light/30 hover:-translate-y-1 cursor-pointer group'
                }`}
                onClick={() => !project.placeholder && setSelected(project)}
                role={!project.placeholder ? 'button' : undefined}
                tabIndex={!project.placeholder ? 0 : undefined}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !project.placeholder) {
                    e.preventDefault();
                    setSelected(project);
                  }
                }}
              >
                {project.placeholder && (
                  <div className="flex items-center gap-2 text-ink-muted dark:text-parchment-muted text-xs mb-3">
                    <Construction size={13} />
                    In the pipeline
                  </div>
                )}

                <h3 className="text-lg font-bold text-ink-heading dark:text-parchment-heading mb-2 group-hover:text-forest-mid dark:group-hover:text-forest-light transition-colors">
                  {project.title}
                </h3>
                <p className="text-ink-body dark:text-parchment-body text-sm leading-relaxed flex-grow mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-forest-light/20 dark:bg-forest-dark/30 text-ink-badge dark:text-forest-light border border-forest-light/40 dark:border-forest-dark/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {!project.placeholder && (
                  <div className="flex items-center gap-3 pt-2 border-t border-earth-light dark:border-forest-dark/30">
                    <span className="flex items-center gap-1 text-xs text-forest-mid dark:text-forest-light font-medium">
                      <ChevronRight size={13} />
                      View Details
                    </span>
                    <div className="ml-auto flex items-center gap-3">
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs text-ink-muted dark:text-parchment-muted hover:text-forest-mid dark:hover:text-forest-light transition-colors"
                        >
                          <Github size={13} />
                          Source
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-1.5 text-xs text-ink-muted dark:text-parchment-muted hover:text-forest-mid dark:hover:text-forest-light transition-colors"
                        >
                          <ExternalLink size={13} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
