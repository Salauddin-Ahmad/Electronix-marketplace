import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './ui/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)'
        },
        accent: 'hsl(var(--accent) / <alpha-value>)',
        muted: { foreground: 'hsl(var(--muted-foreground) / <alpha-value>)' },
        border: 'hsl(var(--border) / <alpha-value>)',
        brand: { 500: '#2563eb', 600: '#1d4ed8' },
        ink: '#1b1c1c',
        surface: '#fbf9f9',
        line: '#d7dee8',
        panel: '#f1f0ed',
        dark: '#2b2d2b',
        yellow: '#60a5fa'
      },
      fontFamily: { display: ['Rajdhani', 'sans-serif'], sans: ['Chivo', 'Inter', 'sans-serif'] },
      maxWidth: { shell: '1440px' },
      boxShadow: { subtle: '0 4px 12px rgba(0,0,0,.05)' }
    }
  },
  plugins: []
};
export default config;
