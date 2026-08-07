/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        gold: '#DC2626',
        'gold-muted': 'rgba(220,38,38,0.4)',
        'gold-faint': 'rgba(220,38,38,0.08)',
        'white-primary': '#F7F7F5',
        'white-muted': '#9A9A9A',
        'white-faint': '#3A3A3A',
        surface: '#0E0E0E',
        'surface-2': '#141414',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #A8892A 100%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
    },
  },
  plugins: [],
};
