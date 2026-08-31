'use client';

import React from 'react';
import { Cpu, Layers, Zap, Sparkles, Sliders } from 'lucide-react';
import { PIPELINE_TOOLS, DICTIONARY } from '@/lib/i18n';
import { Language } from '@/types';

interface ShowcasePipelineProps {
  lang: Language;
}

const TOOL_ICONS = [Cpu, Layers, Zap, Sparkles, Sliders];

export default function ShowcasePipeline({ lang }: ShowcasePipelineProps) {
  const t = DICTIONARY[lang];

  return (
    <section className="max-w-xl mx-auto mb-10 px-4">
      {/* Section Header */}
      <div className="mb-6 text-center">
        <h2 className="mono text-xs tracking-[0.2em] uppercase text-gold font-bold mb-1.5">
          {t.pipelineTitle}
        </h2>
        <p className="text-xs text-fg-muted max-w-md mx-auto">
          {t.pipelineSub}
        </p>
      </div>

      {/* Grid of Tools */}
      <div className="space-y-3.5">
        {PIPELINE_TOOLS.map((tool, idx) => {
          const IconComp = TOOL_ICONS[idx % TOOL_ICONS.length];
          return (
            <div
              key={tool.id}
              className="ovizai-card p-4 sm:p-5 relative group transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-gold/10 border border-gold/20 text-gold group-hover:text-gold-bright transition-colors">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="mono text-sm font-bold text-fg group-hover:text-gold-bright transition-colors">
                      {tool.name}
                    </h3>
                    <span className="mono text-[10px] tracking-wider text-fg-muted uppercase">
                      {tool.category} • {tool.version}
                    </span>
                  </div>
                </div>

                <span className="mono text-[9.5px] px-2 py-0.5 rounded bg-white/[0.03] border border-border-strong text-gold font-medium">
                  {tool.badge}
                </span>
              </div>

              <p className="text-xs text-fg-muted leading-relaxed mb-3">
                {tool.desc[lang]}
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border/60">
                {tool.features[lang].map((feat, fIdx) => (
                  <span
                    key={`${tool.id}-feat-${fIdx}`}
                    className="mono text-[10px] text-fg-muted bg-black/40 border border-border/80 px-2 py-0.5 rounded-sm"
                  >
                    #{feat}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
