import React from 'react';
import Image from 'next/image';

/**
 * CinematicBackground:
 * Subtle, high-end studio chiaroscuro backdrop designed specifically around OVIZai's central layout.
 * Features deep obsidian shadows in the center column to preserve maximum text and card readability,
 * while revealing soft studio architectural textures and warm ambient rim lights on the margins.
 */
export default function CinematicBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Base Dark Luxury Wallpaper */}
      <Image
        src="/bg-cinema.webp"
        alt=""
        fill
        priority
        quality={80}
        sizes="100vw"
        className="object-cover object-center w-full h-full opacity-35 mix-blend-screen scale-[1.02]"
      />

      {/* 2. Center Column Darkening Mask (Guarantees 100% contrast behind max-w-xl content) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,_rgba(8,8,8,0.65)_0%,_rgba(8,8,8,0.92)_55%,_#080808_100%)]" />

      {/* 3. Top & Bottom Seamless Dark Edge Blends */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-transparent to-[#080808]" />
    </div>
  );
}
