'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none animate-bounce-short">
      <div className="border border-border-gold bg-black/95 backdrop-blur-md rounded-full px-4 sm:px-6 py-2.5 mono text-xs text-gold-bright shadow-toast flex items-center gap-2.5">
        <Sparkles className="w-3.5 h-3.5 text-gold-bright flex-shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
}
