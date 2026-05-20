'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ExternalLink, Github, BookOpen, ImageIcon, Lightbulb, ArrowRight,
  Play, Film, Rocket, CheckCircle, Send,
} from 'lucide-react';
import type { ProjectEntry, MediaItem } from '@/types';

interface ProjectModalProps {
  project: ProjectEntry | null;
  onClose: () => void;
}

function ImageThumbnail({ item, index, onClick }: { item: MediaItem; index: number; onClick: () => void }) {
  return (
    <div
      className="relative aspect-video rounded-xl overflow-hidden border border-earth-light dark:border-forest-dark/40 cursor-zoom-in group"
      onClick={onClick}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.caption ?? `Screenshot ${index + 1}`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      {item.caption && (
        <div className="absolute bottom-0 inset-x-0 px-2.5 py-1.5 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-white text-xs truncate">{item.caption}</p>
        </div>
      )}
    </div>
  );
}

function VideoThumbnail({ item, onClick }: { item: MediaItem; onClick: () => void }) {
  return (
    <div
      className="relative aspect-video rounded-xl overflow-hidden border border-earth-light dark:border-forest-dark/40 cursor-pointer group"
      onClick={onClick}
    >
      {/* preload="metadata" loads only the first frame — avoids downloading the full video on page load */}
      <video
        src={item.src}
        preload="metadata"
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Play button overlay — always visible so videos are distinguishable from images */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-colors">
        <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
          <Play size={18} className="text-ink-heading ml-1" fill="currentColor" />
        </div>
      </div>
      {item.caption && (
        <div className="absolute bottom-0 inset-x-0 px-2.5 py-1.5 bg-gradient-to-t from-black/70 to-transparent">
          <p className="text-white text-xs truncate">{item.caption}</p>
        </div>
      )}
    </div>
  );
}

const inputClass =
  'w-full px-3 py-2 bg-linen dark:bg-moss border border-earth-light dark:border-forest-dark/40 rounded-lg text-ink-body dark:text-parchment-body placeholder-ink-muted/50 dark:placeholder-parchment-muted/50 focus:outline-none focus:border-forest-mid dark:focus:border-forest-light focus:ring-1 focus:ring-forest-mid/20 dark:focus:ring-forest-light/20 transition-all text-sm';

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);
  const [videoItem, setVideoItem] = useState<MediaItem | null>(null);
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [accessSubmitted, setAccessSubmitted] = useState(false);
  const [accessLoading, setAccessLoading] = useState(false);

  // Reset form state when a different project is opened
  useEffect(() => {
    setShowAccessForm(false);
    setAccessSubmitted(false);
    setAccessLoading(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxItem) { setLightboxItem(null); return; }
        if (videoItem) { setVideoItem(null); return; }
        onClose();
      }
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose, lightboxItem, videoItem]);

  async function handleAccessSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAccessLoading(true);
    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'YOUR_FORM_ID';
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) setAccessSubmitted(true);
    } finally {
      setAccessLoading(false);
    }
  }

  const media = project?.detail?.media ?? [];
  const showTryItOut = project?.liveUrl || project?.requestAccess;

  return (
    <>
      <AnimatePresence>
        {project && (
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
                className="relative w-full max-w-3xl max-h-[90vh] bg-offwhite dark:bg-moss-surface rounded-2xl border border-earth-light dark:border-forest-dark/40 shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 border-b border-earth-light dark:border-forest-dark/40 flex-shrink-0">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-ink-heading dark:text-parchment-heading leading-tight">
                      {project.title}
                    </h2>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-0.5 rounded-full bg-forest-light/20 dark:bg-forest-dark/30 text-ink-badge dark:text-forest-light border border-forest-light/40 dark:border-forest-dark/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-ink-muted dark:text-parchment-muted hover:text-forest-mid dark:hover:text-forest-light transition-colors px-3 py-1.5 rounded-lg border border-earth-light dark:border-forest-dark/40 hover:border-forest-mid/40 dark:hover:border-forest-light/30"
                      >
                        <Github size={13} />
                        Source
                      </a>
                    )}
                    <button
                      onClick={onClose}
                      className="p-2 rounded-lg text-ink-muted dark:text-parchment-muted hover:text-ink-heading dark:hover:text-parchment-heading hover:bg-earth-light/20 dark:hover:bg-forest-dark/30 transition-all"
                      aria-label="Close"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Scrollable content */}
                <div className="overflow-y-auto flex-1 px-6 py-6 space-y-8">
                  {/* Overview */}
                  <section>
                    <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-mid dark:text-forest-light mb-3">
                      <BookOpen size={13} />
                      Project Overview
                    </h3>
                    <p className="text-ink-body dark:text-parchment-body text-sm leading-relaxed">
                      {project.detail?.overview ?? project.description}
                    </p>
                  </section>

                  {/* Try It Out */}
                  {showTryItOut && (
                    <section>
                      <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-mid dark:text-forest-light mb-3">
                        <Rocket size={13} />
                        Try It Out
                      </h3>
                      <div className="rounded-xl border border-earth-light dark:border-forest-dark/40 bg-linen/50 dark:bg-moss/30 p-4 space-y-4">
                        <div className="flex flex-wrap gap-3">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 btn-primary text-sm"
                            >
                              <ExternalLink size={14} />
                              Visit Site
                            </a>
                          )}
                          {project.requestAccess && !accessSubmitted && (
                            <button
                              onClick={() => setShowAccessForm((v) => !v)}
                              className="flex items-center gap-2 px-4 py-2 btn-secondary text-sm"
                            >
                              Request Access
                            </button>
                          )}
                        </div>

                        <AnimatePresence>
                          {project.requestAccess && showAccessForm && !accessSubmitted && (
                            <motion.form
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.22, ease: 'easeOut' }}
                              onSubmit={handleAccessSubmit}
                              className="space-y-3 overflow-hidden"
                            >
                              {/* Hidden field to tag this submission as an access request */}
                              <input type="hidden" name="form_type" value="access_request" />
                              <input type="hidden" name="project" value={project.title} />

                              <div className="pt-1">
                                <label className="block text-xs font-medium text-ink-body dark:text-parchment-body mb-1">
                                  Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                  name="name"
                                  type="text"
                                  required
                                  placeholder="Your name"
                                  className={inputClass}
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-ink-body dark:text-parchment-body mb-1">
                                  Company <span className="text-red-500">*</span>
                                </label>
                                <input
                                  name="company"
                                  type="text"
                                  required
                                  placeholder="Your company or organization"
                                  className={inputClass}
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-ink-body dark:text-parchment-body mb-1">
                                  Reason for Access <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                  name="reason"
                                  required
                                  rows={3}
                                  placeholder="How do you plan to use the app?"
                                  className={`${inputClass} resize-none`}
                                />
                              </div>
                              <button
                                type="submit"
                                disabled={accessLoading}
                                className="flex items-center gap-2 px-4 py-2 btn-primary text-sm disabled:opacity-60"
                              >
                                {accessLoading ? (
                                  <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                                ) : (
                                  <Send size={13} />
                                )}
                                Submit Request
                              </button>
                            </motion.form>
                          )}

                          {project.requestAccess && accessSubmitted && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="flex items-center gap-3 text-sm text-forest-mid dark:text-forest-light"
                            >
                              <CheckCircle size={16} />
                              Request sent! I&apos;ll be in touch soon.
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </section>
                  )}

                  {/* Screenshots & Media */}
                  <section>
                    <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-mid dark:text-forest-light mb-3">
                      <Film size={13} />
                      Screenshots &amp; Media
                    </h3>
                    {media.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {media.map((item, i) =>
                          item.type === 'video' ? (
                            <VideoThumbnail key={i} item={item} onClick={() => setVideoItem(item)} />
                          ) : (
                            <ImageThumbnail key={i} item={item} index={i} onClick={() => setLightboxItem(item)} />
                          )
                        )}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="aspect-video rounded-xl border-2 border-dashed border-earth-light dark:border-forest-dark/30 bg-linen dark:bg-moss flex flex-col items-center justify-center gap-1"
                          >
                            <ImageIcon size={16} className="text-ink-muted/30 dark:text-parchment-muted/30" />
                            <span className="text-xs text-ink-muted/40 dark:text-parchment-muted/40">Coming soon</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>

                  {/* Lessons Learned */}
                  <section>
                    <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-mid dark:text-forest-light mb-3">
                      <Lightbulb size={13} />
                      Lessons Learned
                    </h3>
                    {project.detail?.lessonsLearned && project.detail.lessonsLearned.length > 0 ? (
                      <ul className="space-y-2">
                        {project.detail.lessonsLearned.map((lesson, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-ink-body dark:text-parchment-body">
                            <span className="w-1.5 h-1.5 rounded-full bg-forest-mid dark:bg-forest-light mt-1.5 flex-shrink-0" />
                            {lesson}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-ink-muted/60 dark:text-parchment-muted/60 italic">
                        Coming soon. This section will be filled out after the project is fully documented.
                      </p>
                    )}
                  </section>

                  {/* Next Steps */}
                  <section>
                    <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-forest-mid dark:text-forest-light mb-3">
                      <ArrowRight size={13} />
                      Next Steps
                    </h3>
                    {project.detail?.nextSteps && project.detail.nextSteps.length > 0 ? (
                      <ul className="space-y-2">
                        {project.detail.nextSteps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-ink-body dark:text-parchment-body">
                            <span className="w-1.5 h-1.5 rounded-full bg-earth-dark dark:bg-earth-light mt-1.5 flex-shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-ink-muted/60 dark:text-parchment-muted/60 italic">
                        To be determined. Check back after the project reaches its next milestone.
                      </p>
                    )}
                  </section>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Image lightbox — rendered outside the project modal so it sits above it */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 sm:p-10"
            onClick={() => setLightboxItem(null)}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxItem.src}
              alt={lightboxItem.caption ?? 'Screenshot'}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            {lightboxItem.caption && (
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm whitespace-nowrap">
                {lightboxItem.caption}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video fullscreen player — rendered above the project modal */}
      <AnimatePresence>
        {videoItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 sm:p-10"
            onClick={() => setVideoItem(null)}
          >
            <button
              onClick={() => setVideoItem(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close video player"
            >
              <X size={20} />
            </button>
            <video
              src={videoItem.src}
              controls
              autoPlay
              playsInline
              className="max-w-full rounded-xl shadow-2xl"
              style={{ maxHeight: 'calc(100vh - 6rem)' }}
              onClick={(e) => e.stopPropagation()}
            />
            {videoItem.caption && (
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm whitespace-nowrap">
                {videoItem.caption}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
