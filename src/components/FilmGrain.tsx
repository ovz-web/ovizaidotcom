import React from 'react';

export default function FilmGrain() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(236,228,211,0.15) 0%, transparent 60%), repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)`,
      }}
    />
  );
}