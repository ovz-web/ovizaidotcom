/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0b0a08',
          card: '#141210',
          inset: '#000000',
          dark: '#080808'
        },
        fg: {
          DEFAULT: '#ece4d3',
          muted: '#8c8375',
          muted2: '#5c564c'
        },
        gold: {
          DEFAULT: '#caa243',
          bright: '#f0c869',
          dim: '#7a5f21'
        },
        border: {
          DEFAULT: 'rgba(236,228,211,0.08)',
          strong: 'rgba(236,228,211,0.16)',
          gold: 'rgba(202,162,67,0.3)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'monospace'],
        display: ['Syne', 'Archivo Black', 'sans-serif']
      },
      boxShadow: {
        gold: '0 14px 26px rgba(202,162,67,0.16)',
        modal: '0 40px 80px -20px rgba(0,0,0,0.8)',
        card: '0 30px 60px -30px rgba(0,0,0,0.7)',
        toast: '0 20px 40px -10px rgba(0,0,0,0.6)'
      }
    },
  },
  plugins: [],
};
