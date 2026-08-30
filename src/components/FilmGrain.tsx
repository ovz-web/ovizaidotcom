'use client';

import React from 'react';

export default function FilmGrain() {
  return (
    <>
      <svg className="grain-overlay" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
      <div className="aura" />
    </>
  );
}
