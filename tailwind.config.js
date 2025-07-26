/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./*.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // DEN Brand Colors
        den: {
          primary: '#302919',      // Main brand color
          secondary: '#85590F',    // Accent color
          gold: '#F2D793',         // Gold accent
          dark: '#0F0D08',         // Footer background
          'dark-alpha': '#0F0D08D9', // Program cards background
        },
        // Header Colors
        header: {
          'from': '#1E1E1E',       // Header gradient start
          'to': '#323232',         // Header gradient end
          'border': '#5e5e5e',     // Header border
        },
        // Text Colors
        text: {
          primary: '#21272A',      // Hero text
          secondary: '#0F172A',    // Section headings
          dark: '#1E1E1E',         // Dark text
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
