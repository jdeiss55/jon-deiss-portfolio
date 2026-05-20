'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import type { Message } from '@/types';

const STARTER_QUESTIONS = [
  'What industries has Jon worked in?',
  'What AI tools is Jon familiar with?',
  'What kind of roles is Jon targeting?',
];

export default function AskJon() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: text.trim() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    const assistantMsg: Message = { role: 'assistant', content: '' };
    setMessages([...nextMessages, assistantMsg]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error('API error');

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: accumulated };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="flex flex-col h-[480px] bg-offwhite dark:bg-moss-surface border border-earth-light dark:border-forest-dark/40 rounded-2xl overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-earth-light dark:border-forest-dark/40 bg-cream dark:bg-moss">
        <div className="w-8 h-8 rounded-full bg-forest-light/30 dark:bg-forest-dark/40 flex items-center justify-center">
          <Bot size={16} className="text-forest-mid dark:text-forest-light" />
        </div>
        <div>
          <p className="text-ink-heading dark:text-parchment-heading font-semibold text-sm">Ask Jon</p>
          <p className="text-ink-muted dark:text-parchment-muted text-xs">AI-powered · Based on real background</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-forest-mid dark:bg-forest-light animate-pulse" />
          <span className="text-xs text-ink-muted dark:text-parchment-muted">Live</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <p className="text-ink-muted dark:text-parchment-muted text-sm">
              Ask me anything about Jon&apos;s background, experience, or career goals.
            </p>
            <div className="flex flex-col gap-2 w-full max-w-sm">
              {STARTER_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-left text-sm px-4 py-2.5 btn-secondary rounded-lg"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-7 h-7 rounded-full bg-forest-light/30 dark:bg-forest-dark/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot size={13} className="text-forest-mid dark:text-forest-light" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-forest-light/25 text-ink-body dark:text-parchment-body border border-forest-light/40 dark:border-forest-dark/40 rounded-br-sm'
                  : 'bg-linen dark:bg-moss border border-earth-light dark:border-forest-dark/30 text-ink-body dark:text-parchment-body rounded-bl-sm'
              }`}
            >
              {msg.content || (isLoading && i === messages.length - 1 && (
                <Loader2 size={14} className="animate-spin text-forest-mid dark:text-forest-light" />
              ))}
            </div>
            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-full bg-earth-light/30 dark:bg-earth-mid/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <User size={13} className="text-ink-muted dark:text-parchment-muted" />
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-earth-light dark:border-forest-dark/40 bg-cream dark:bg-moss flex items-end gap-2">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Jon's experience, skills, or goals..."
          rows={1}
          disabled={isLoading}
          className="flex-1 resize-none bg-offwhite dark:bg-moss-surface border border-earth-light dark:border-forest-dark/40 rounded-xl px-4 py-2.5 text-sm text-ink-body dark:text-parchment-body placeholder-ink-muted/50 dark:placeholder-parchment-muted/50 focus:outline-none focus:border-forest-mid dark:focus:border-forest-light focus:ring-1 focus:ring-forest-mid/20 dark:focus:ring-forest-light/20 transition-all disabled:opacity-50 max-h-28 overflow-y-auto"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={isLoading || !input.trim()}
          className="p-2.5 btn-primary disabled:opacity-40 rounded-xl flex-shrink-0"
          aria-label="Send"
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
        </button>
      </div>
    </div>
  );
}
