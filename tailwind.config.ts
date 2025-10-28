import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0f0f1a',
          lighter: '#1a1a2e',
          light: '#16213e',
        },
        primary: {
          DEFAULT: '#6c5ce7',
          dark: '#5d4aec',
          light: '#7c6eee',
        },
        secondary: {
          DEFAULT: '#ff7675',
          dark: '#e84393',
        },
        accent: {
          DEFAULT: '#00b894',
          dark: '#00a884',
        },
        text: {
          primary: '#ffffff',
          secondary: '#b8c2cc',
          muted: '#6c7293',
        },
        border: {
          DEFAULT: '#2d3748',
          light: '#3a3f50',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      },
      boxShadow: {
        'card': '0 4px 20px 0 rgba(0, 0, 0, 0.4)',
        'button': '0 4px 15px rgba(108, 92, 231, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default config;
