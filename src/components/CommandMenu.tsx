'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, Film, Sparkles, Terminal, Mail, X } from 'lucide-react';
import { COMMANDS, DICTIONARY } from '@/lib/i18n';
import { CommandItem, Language } from '@/types';

interface CommandMenuProps {
  lang: Language;
  onShowToast: (msg: string) => void;
}

const ICON_MAP = {
  video: Film,
  art: Sparkles,
  workflow: Terminal,
  contact: Mail,
};

export default function CommandMenu({ lang, onShowToast }: CommandMenuProps) {
  const t = DICTIONARY[lang];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  const modKey = isMac ? '⌘' : 'Ctrl+';

  const handleCommand = useCallback((cmd: CommandItem) => {
    if (cmd.type === 'contact') {
      onShowToast(t.toastContact);
      const mailto = `mailto:contact@ovizai.com?subject=${encodeURIComponent(cmd.mailtoSubject || cmd.title[lang])}`;
      setTimeout(() => {
        window.location.href = mailto;
      }, 300);
    } else if (cmd.type === 'scroll' && cmd.target) {
      onShowToast(t.toastResources);
      const element = document.querySelector(cmd.target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [lang, onShowToast, t.toastContact, t.toastResources]);

  // Global Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input or textarea
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea') {
        if (e.key === 'Escape' && isModalOpen) {
          setIsModalOpen(false);
        }
        return;
      }

      const mod = isMac ? e.metaKey : e.ctrlKey;

      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsModalOpen(prev => !prev);
        return;
      }

      if (e.key === 'Escape') {
        setIsModalOpen(false);
        return;
      }

      // Single Key / Mod Key Shortcuts P, D, R, C
      const keyUpper = e.key.toUpperCase();
      if (!mod && ['P', 'D', 'R', 'C'].includes(keyUpper)) {
        const matchedCmd = COMMANDS.find(c => c.key === keyUpper);
        if (matchedCmd) {
          e.preventDefault();
          handleCommand(matchedCmd);
        }
      } else if (mod && ['P', 'D', 'R', 'C'].includes(keyUpper)) {
        const matchedCmd = COMMANDS.find(c => c.key === keyUpper);
        if (matchedCmd) {
          e.preventDefault();
          handleCommand(matchedCmd);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMac, isModalOpen, handleCommand]);

  const filteredCommands = COMMANDS.filter(cmd => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      cmd.title[lang].toLowerCase().includes(q) ||
      cmd.sub[lang].toLowerCase().includes(q) ||
      cmd.key.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* Command Card Container */}
      <div className="ovizai-card max-w-xl mx-auto mb-8">
        {/* Search Trigger */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-between bg-none border-b border-border text-fg-muted hover:bg-white/[0.02] hover:text-fg px-4 sm:px-5 py-3.5 text-xs sm:text-sm font-sans cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-fg-muted2" />
            <span>{t.searchTrigger}</span>
          </div>
          <kbd className="hidden sm:inline-block">{modKey}K</kbd>
        </button>

        {/* Command Rows List */}
        <div className="flex flex-col divide-y divide-border">
          {COMMANDS.map(cmd => {
            const IconComponent = ICON_MAP[cmd.icon];
            return (
              <button
                key={cmd.id}
                type="button"
                onClick={() => handleCommand(cmd)}
                className="group w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 bg-none hover:bg-white/[0.025] text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <IconComponent className="w-4 h-4 text-gold group-hover:text-gold-bright flex-shrink-0 transition-colors" />
                  <div className="flex flex-col min-w-0">
                    <span className="mono text-xs sm:text-[13px] font-semibold text-fg group-hover:text-gold-bright transition-colors truncate">
                      {cmd.title[lang]}
                    </span>
                    <span className="text-[11px] sm:text-xs text-fg-muted2 mt-0.5 truncate">
                      {cmd.sub[lang]}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <kbd className="mono text-[10px] text-fg-muted2">
                    {modKey}{cmd.key}
                  </kbd>
                  <span className="mono text-[10.5px] text-fg-muted group-hover:text-gold-bright hidden sm:inline transition-colors font-medium">
                    [{cmd.action[lang]}]
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal Search Palette */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-center items-start pt-20 sm:pt-28 px-4"
          onClick={e => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="w-full max-w-xl bg-bg-card border border-border-strong rounded-xl p-3 shadow-modal">
            {/* Modal Input */}
            <div className="flex items-center gap-3 border-b border-border pb-3 px-2">
              <Search className="w-4 h-4 text-fg-muted2 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                autoFocus
                className="flex-1 bg-transparent border-none text-fg mono text-xs sm:text-sm focus:outline-none placeholder:text-fg-muted2"
              />
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-fg-muted hover:text-fg p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Results List */}
            <div className="py-2 max-h-72 overflow-y-auto">
              {filteredCommands.length === 0 ? (
                <div className="px-4 py-6 text-center mono text-xs text-fg-muted2">
                  — Aucune commande trouvée —
                </div>
              ) : (
                filteredCommands.map(cmd => (
                  <button
                    key={`modal-${cmd.id}`}
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      handleCommand(cmd);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-gold/10 hover:text-gold-bright transition-colors text-left mono text-xs text-fg/90 cursor-pointer mb-1"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                      <span>{cmd.title[lang]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-fg-muted2 text-[10.5px]">
                      <kbd>{cmd.key}</kbd>
                      <span>{cmd.action[lang]}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
