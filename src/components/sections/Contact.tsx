'use client';

import AnimatedSection from '@/components/ui/AnimatedSection';
import { useState } from 'react';
import { Linkedin, Github, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'YOUR_FORM_ID';

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    'w-full px-4 py-2.5 bg-offwhite dark:bg-moss-surface border border-earth-light dark:border-forest-dark/40 rounded-lg text-ink-body dark:text-parchment-body placeholder-ink-muted/50 dark:placeholder-parchment-muted/50 focus:outline-none focus:border-forest-mid dark:focus:border-forest-light focus:ring-1 focus:ring-forest-mid/20 dark:focus:ring-forest-light/20 transition-all text-sm';

  return (
    <section id="contact" className="py-24 bg-linen dark:bg-moss-secondary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-ink-heading dark:text-parchment-heading mb-2">Let&apos;s Connect</h2>
          <p className="text-ink-muted dark:text-parchment-muted">
            Open to AI product, solutions engineering, and implementation consulting roles, including federal.
            Reach out and let&apos;s talk.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-8">
          {/* Form */}
          <AnimatedSection delay={0.1} className="sm:col-span-2 lg:col-span-1">
            {submitted ? (
              <div className="card-glass rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[300px]">
                <CheckCircle size={40} className="text-forest-mid dark:text-forest-light" />
                <h3 className="text-ink-heading dark:text-parchment-heading font-bold text-lg">Message sent!</h3>
                <p className="text-ink-muted dark:text-parchment-muted text-sm">I&apos;ll get back to you soon. Talk then!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card-glass rounded-2xl p-6 sm:p-8 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink-body dark:text-parchment-body mb-1.5">
                    Name
                  </label>
                  <input id="name" name="name" type="text" required className={inputClass} placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-ink-body dark:text-parchment-body mb-1.5">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required className={inputClass} placeholder="your@email.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-ink-body dark:text-parchment-body mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className={`${inputClass} resize-none`}
                    placeholder="What's on your mind?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 btn-primary disabled:opacity-60"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-ink-heading/30 dark:border-parchment-heading/30 border-t-ink-heading dark:border-t-parchment-heading rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </AnimatedSection>

          {/* Social links */}
          <AnimatedSection delay={0.2} className="flex flex-col justify-center gap-4 sm:col-span-2 lg:col-span-1">
            <a
              href="https://www.linkedin.com/in/jonathan-deiss"
              target="_blank"
              rel="noopener noreferrer"
              className="card-glass rounded-xl p-5 flex items-center gap-4 hover:border-forest-mid/40 dark:hover:border-forest-light/30 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#0A66C2]/15 dark:bg-[#0A66C2]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0A66C2]/25 transition-colors">
                <Linkedin size={20} className="text-[#0A66C2]" />
              </div>
              <div>
                <p className="text-ink-heading dark:text-parchment-heading font-semibold text-sm">LinkedIn</p>
                <p className="text-ink-muted dark:text-parchment-muted text-xs">linkedin.com/in/jonathan-deiss</p>
              </div>
            </a>
            <a
              href="https://www.github.com/jdeiss55"
              target="_blank"
              rel="noopener noreferrer"
              className="card-glass rounded-xl p-5 flex items-center gap-4 hover:border-forest-mid/40 dark:hover:border-forest-light/30 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-earth-mid/10 dark:bg-moss-surface flex items-center justify-center flex-shrink-0 group-hover:bg-earth-light/20 dark:group-hover:bg-moss transition-colors">
                <Github size={20} className="text-ink-body dark:text-parchment-body" />
              </div>
              <div>
                <p className="text-ink-heading dark:text-parchment-heading font-semibold text-sm">GitHub</p>
                <p className="text-ink-muted dark:text-parchment-muted text-xs">github.com/jdeiss55</p>
              </div>
            </a>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
