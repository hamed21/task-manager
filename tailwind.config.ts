import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/Common/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        base: {
          white: '#FFFFFF',
          dark: '#000000',
          normalText: '#334155',
          minorText: '#4338ca'
        },
        primary: {
          light: '#60a5fa',
          dark: '#2563eb',
          normal: '#3B82F6'
        },
        success: {
          light: '#34d399',
          dark: '#059669',
          normal: '#10B981'
        },
        error: {
          light: '#f87171',
          dark: '#dc2626',
          normal: '#EF4444'
        },
        warning: {
          light: '#fbbf24',
          dark: '#d97706',
          normal: '#F59E0B'
        },
        gray: {
          light: '#F3F4F6',
          dark: '#111827',
          normal: '#6B7280',
          border: '#d1d5db'
        },
        accent: {
          purple: '#8B5CF6',
          teal: '#14B8A6'
        },
        background: {
          main: '#F5F5F7',
          normal: '#FFFFFF',
          subtle: '#E0F2FE'
        }
      }
    }
  },
  plugins: []
};
export default config;
