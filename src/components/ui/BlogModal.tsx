'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Tag } from 'lucide-react';
import type { BlogPost } from '@/types';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function BlogModal({ post, onClose }: BlogModalProps) {
  useEffect(() => {
    if (!post) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [post, onClose]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <AnimatePresence>
      {post && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-moss/50 dark:bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-offwhite dark:bg-moss-surface rounded-2xl border border-earth-light dark:border-forest-dark/40 shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-earth-light dark:border-forest-dark/40 flex-shrink-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-ink-muted dark:text-parchment-muted text-xs mb-2">
                    <Calendar size={12} />
                    {formatDate(post.date)}
                    {post.placeholder && (
                      <span className="ml-1 text-earth-dark/60 dark:text-earth-light/60 italic">(draft)</span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-ink-heading dark:text-parchment-heading leading-tight">
                    {post.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
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
                </div>

                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-2 rounded-lg text-ink-muted dark:text-parchment-muted hover:text-ink-heading dark:hover:text-parchment-heading hover:bg-earth-light/20 dark:hover:bg-forest-dark/30 transition-all"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto flex-1 px-6 py-6">
                {post.body ? (
                  <div className="prose prose-sm max-w-none text-ink-body dark:text-parchment-body leading-relaxed space-y-4">
                    {post.body.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-ink-body dark:text-parchment-body text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="border-t border-earth-light dark:border-forest-dark/30 pt-4">
                      <p className="text-sm text-ink-muted/60 dark:text-parchment-muted/60 italic">
                        Full post coming soon. This piece is still being written.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
