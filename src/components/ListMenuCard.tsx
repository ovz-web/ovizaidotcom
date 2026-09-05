'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';

export interface ListMenuItem {
  id: string;
  icon?: React.ComponentType<{ className?: string }>;
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  href?: string;
  onClick?: () => void;
  expanded?: boolean;
  expandedContent?: ReactNode;
  className?: string;
}

export interface ListMenuCardProps {
  items: ListMenuItem[];
  className?: string;
}

export default function ListMenuCard({ items, className = '' }: ListMenuCardProps) {
  return (
    <div className={`ovizai-card max-w-xl mx-auto ${className}`.trim()}>
      <div className="flex flex-col divide-y divide-white/[0.06]">
        {items.map((item) => {
          const IconComp = item.icon;

          const innerContent = (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3 min-w-0">
                {IconComp && (
                  <IconComp className="w-4 h-4 text-gold group-hover:text-gold-bright flex-shrink-0 transition-colors" />
                )}
                <div className="flex flex-col min-w-0">
                  <span className="mono text-xs sm:text-[13px] font-semibold text-fg group-hover:text-gold-bright transition-colors truncate">
                    {item.title}
                  </span>
                  {item.subtitle && (
                    <span className="text-[11px] sm:text-xs text-muted mt-0.5 truncate">
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>

              {item.trailing !== undefined && (
                <span className="mono text-[10.5px] text-gold group-hover:text-gold-bright hidden sm:inline transition-colors font-medium flex-shrink-0">
                  {item.trailing}
                </span>
              )}
            </div>
          );

          if (item.href) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bg-none hover:bg-white/[0.025] text-left transition-colors cursor-pointer"
              >
                {innerContent}
              </Link>
            );
          }

          if (item.onClick || item.expandedContent) {
            return (
              <div key={item.id} className="w-full">
                <button
                  type="button"
                  onClick={item.onClick}
                  className="group w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bg-none hover:bg-white/[0.025] text-left transition-colors cursor-pointer"
                >
                  {innerContent}
                </button>

                {item.expanded && item.expandedContent && (
                  <div className="px-4 sm:px-5 py-3 sm:py-4 border-t border-white/[0.06] bg-black/20 text-xs text-muted">
                    {item.expandedContent}
                  </div>
                )}
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className="group w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5 sm:py-3 bg-none text-left"
            >
              {innerContent}
            </div>
          );
        })}
      </div>
    </div>
  );
}
