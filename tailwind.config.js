/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-gradient-start': '#4A90E2',
        'blue-gradient-end': '#357ABD',
        'orange-gradient-start': '#FF8A50',
        'orange-gradient-end': '#FF6B35',
        'purple-bg': '#6B73FF',
        'light-gray': '#F8F9FA',
        'dark-gray': '#2C3E50',
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
        'orange-gradient': 'linear-gradient(135deg, #FF8A50 0%, #FF6B35 100%)',
        'purple-gradient': 'linear-gradient(135deg, #6B73FF 0%, #9B59B6 100%)',
        'green-gradient': 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
} 