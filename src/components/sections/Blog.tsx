'use client';

import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import BlogModal from '@/components/ui/BlogModal';
import { blogPosts } from '@/data/blog';
import { Calendar, Tag, ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/types';

export default function Blog() {
  const [selected, setSelected] = useState<BlogPost | null>(null);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <section id="blog" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink-heading dark:text-parchment-heading mb-2">Writing</h2>
          <p className="text-ink-muted dark:text-parchment-muted mb-12">Thinking out loud about AI, consulting, and the road ahead.</p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <AnimatedSection key={post.id} delay={index * 0.1}>
              <article
                className="card-glass rounded-2xl p-6 h-full flex flex-col hover:border-forest-mid/40 dark:hover:border-forest-light/30 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                onClick={() => setSelected(post)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelected(post);
                  }
                }}
              >
                <div className="flex items-center gap-1.5 text-ink-muted dark:text-parchment-muted text-xs mb-3">
                  <Calendar size={12} />
                  {formatDate(post.date)}
                  {post.placeholder && (
                    <span className="ml-2 text-earth-dark/60 dark:text-earth-light/60 italic">(draft)</span>
                  )}
                </div>

                <h3 className="text-base font-bold text-ink-heading dark:text-parchment-heading mb-3 leading-snug group-hover:text-forest-mid dark:group-hover:text-forest-light transition-colors">
                  {post.title}
                </h3>

                <p className="text-ink-body dark:text-parchment-body text-sm leading-relaxed flex-grow mb-4">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 text-xs text-ink-muted dark:text-parchment-muted"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-earth-light dark:border-forest-dark/30">
                  <span className="flex items-center gap-1.5 text-xs text-forest-mid dark:text-forest-light group-hover:text-forest-hover dark:group-hover:text-forest-light/80 transition-colors">
                    <ChevronRight size={12} />
                    {post.placeholder && !post.body ? 'Preview post' : 'Read post'}
                  </span>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <BlogModal post={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
