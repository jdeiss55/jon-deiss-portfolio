import AnimatedSection from '@/components/ui/AnimatedSection';
import AskJon from '@/components/agents/AskJon';
import RoleFitAnalyzer from '@/components/agents/RoleFitAnalyzer';
import { Bot, Sparkles } from 'lucide-react';

export default function AIAgents() {
  return (
    <section
      id="ai-agents"
      className="py-24 bg-gradient-to-b from-linen via-[#E2EBD8] to-linen dark:from-moss dark:via-[#1E3425] dark:to-moss relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-forest-light/15 dark:bg-forest-dark/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-earth-light/20 dark:bg-forest-mid/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <AnimatedSection className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-medium text-ink-badge dark:text-forest-light bg-forest-light/25 dark:bg-forest-dark/30 border border-forest-light/50 dark:border-forest-dark/50 px-3 py-1 rounded-full mb-4">
            <Sparkles size={12} />
            Powered by Anthropic Claude
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-ink-heading dark:text-parchment-heading mb-3">Live AI Agents</h2>
          <p className="text-ink-muted dark:text-parchment-muted max-w-xl mx-auto">
            Two interactive demos built with the Anthropic API. Ask about my background or drop a job
            description to see how I stack up.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Ask Jon */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-forest-light/30 dark:bg-forest-dark/40 flex items-center justify-center border border-forest-light/40 dark:border-forest-dark/50">
                  <Bot size={18} className="text-forest-mid dark:text-forest-light" />
                </div>
                <div>
                  <h3 className="text-ink-heading dark:text-parchment-heading font-bold">Ask Jon</h3>
                  <p className="text-ink-muted dark:text-parchment-muted text-xs">Chat with an AI that knows my background</p>
                </div>
              </div>
              <AskJon />
            </div>
          </AnimatedSection>

          {/* Role Fit Analyzer */}
          <AnimatedSection delay={0.2}>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-earth-light/25 dark:bg-earth-dark/20 flex items-center justify-center border border-earth-light/40 dark:border-earth-dark/30">
                  <Sparkles size={18} className="text-earth-dark dark:text-earth-light" />
                </div>
                <div>
                  <h3 className="text-ink-heading dark:text-parchment-heading font-bold">Role Fit Analyzer</h3>
                  <p className="text-ink-muted dark:text-parchment-muted text-xs">Paste a JD · Get an honest fit assessment</p>
                </div>
              </div>
              <RoleFitAnalyzer />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
