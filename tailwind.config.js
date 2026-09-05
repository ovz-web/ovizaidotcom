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
        card: {
          DEFAULT: '#141210',
        },
        bg: {
          DEFAULT: '#080808',
          card: '#141210',
          inset: '#000000',
          dark: '#080808'
        },
        fg: {
          DEFAULT: '#ece4d3',
          muted: '#A39B8F'
        },
        muted: {
          DEFAULT: '#A39B8F'
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
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'JetBrains Mono', 'monospace'],
        display: ['var(--font-syne)', 'var(--font-archivo-black)', 'sans-serif']
      },
      boxShadow: {
        gold: '0 14px 26px rgba(202,162,67,0.16)',
        modal: '0 40px 80px -20px rgba(0,0,0,0.8)',
        card: '0 30px 60px -30px rgba(0,0,0,0.7)',
        toast: '0 20px 40px -10px rgba(0,0,0,0.6)'
      },
      keyframes: {
        'bounce-short': {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '60%': { transform: 'translateY(-4px)', opacity: '1' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      },
      animation: {
        'bounce-short': 'bounce-short 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
      }
    },
  },
  plugins: [],
};