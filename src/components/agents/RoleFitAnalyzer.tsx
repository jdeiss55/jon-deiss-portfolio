'use client';

import { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle, TrendingUp, ChevronRight } from 'lucide-react';
import type { RoleFitResult } from '@/types';

const SCORE_CONFIG = {
  Strong: {
    label: 'Strong Fit',
    color: 'text-forest-mid dark:text-forest-light',
    bg: 'bg-forest-light/20 dark:bg-forest-dark/30 border-forest-light/40 dark:border-forest-dark/50',
    icon: CheckCircle,
  },
  Moderate: {
    label: 'Moderate Fit',
    color: 'text-earth-dark dark:text-earth-light',
    bg: 'bg-earth-light/20 dark:bg-earth-dark/20 border-earth-light/40 dark:border-earth-dark/30',
    icon: TrendingUp,
  },
  Partial: {
    label: 'Partial Fit',
    color: 'text-earth-dark dark:text-earth-tan',
    bg: 'bg-earth-tan/15 dark:bg-earth-dark/20 border-earth-tan/30 dark:border-earth-dark/30',
    icon: AlertCircle,
  },
};

export default function RoleFitAnalyzer() {
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState<RoleFitResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function analyze() {
    if (!jobDescription.trim() || loading) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription }),
      });

      if (!res.ok) throw new Error('Analysis failed');
      const data = await res.json();
      setResult(data);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const scoreConfig = result ? SCORE_CONFIG[result.fitScore] : null;

  return (
    <div className="space-y-4">
      {/* Input */}
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste a job description here: title, responsibilities, requirements, qualifications..."
        rows={7}
        className="w-full resize-none bg-offwhite dark:bg-moss-surface border border-earth-light dark:border-forest-dark/40 rounded-xl px-4 py-3 text-sm text-ink-body dark:text-parchment-body placeholder-ink-muted/50 dark:placeholder-parchment-muted/50 focus:outline-none focus:border-forest-mid dark:focus:border-forest-light focus:ring-1 focus:ring-forest-mid/20 dark:focus:ring-forest-light/20 transition-all"
      />

      <button
        onClick={analyze}
        disabled={loading || !jobDescription.trim()}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 btn-primary disabled:opacity-40"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Analyzing fit...
          </>
        ) : (
          'Analyze Fit'
        )}
      </button>

      {error && (
        <p className="text-earth-dark dark:text-earth-tan text-sm text-center">{error}</p>
      )}

      {/* Results */}
      {result && scoreConfig && (
        <div className="space-y-4 pt-2 animate-fade-in">
          {/* Score badge */}
          <div className={`flex items-center gap-3 rounded-xl p-4 border ${scoreConfig.bg}`}>
            <scoreConfig.icon size={20} className={scoreConfig.color} />
            <div>
              <p className={`font-bold text-base ${scoreConfig.color}`}>{scoreConfig.label}</p>
              <p className="text-ink-body dark:text-parchment-body text-sm mt-0.5">{result.summary}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="bg-offwhite dark:bg-moss-surface rounded-xl p-4 border border-earth-light dark:border-forest-dark/30">
              <h4 className="text-forest-mid dark:text-forest-light font-semibold text-xs uppercase tracking-wider mb-3">
                Strengths
              </h4>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-body dark:text-parchment-body">
                    <CheckCircle size={13} className="text-forest-mid dark:text-forest-light mt-0.5 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Gaps */}
            <div className="bg-offwhite dark:bg-moss-surface rounded-xl p-4 border border-earth-light dark:border-forest-dark/30">
              <h4 className="text-earth-dark dark:text-earth-light font-semibold text-xs uppercase tracking-wider mb-3">
                Gaps to Address
              </h4>
              <ul className="space-y-2">
                {result.gaps.map((g, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-ink-body dark:text-parchment-body">
                    <AlertCircle size={13} className="text-earth-dark dark:text-earth-light mt-0.5 flex-shrink-0" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Talking Points */}
          <div className="bg-offwhite dark:bg-moss-surface rounded-xl p-4 border border-earth-light dark:border-forest-dark/30">
            <h4 className="text-forest-mid dark:text-forest-light font-semibold text-xs uppercase tracking-wider mb-3">
              Interview Talking Points
            </h4>
            <ul className="space-y-2">
              {result.talkingPoints.map((tp, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-body dark:text-parchment-body">
                  <ChevronRight size={13} className="text-forest-mid dark:text-forest-light mt-0.5 flex-shrink-0" />
                  {tp}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
