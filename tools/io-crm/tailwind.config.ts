import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: '#7F77DD',
        'purple-l': '#EEEDFE',
        'purple-d': '#3C3489',
        teal: '#1D9E75',
        'teal-l': '#E1F5EE',
        'teal-d': '#085041',
        coral: '#D85A30',
        'coral-l': '#FAECE7',
        'coral-d': '#712B13',
        blue: '#378ADD',
        'blue-l': '#E6F1FB',
        'blue-d': '#0C447C',
        amber: '#BA7517',
        'amber-l': '#FAEEDA',
        'amber-d': '#633806',
        green: '#639922',
        'green-l': '#EAF3DE',
        'green-d': '#27500A',
        red: '#E24B4A',
        'red-l': '#FCEBEB',
        'red-d': '#791F1F',
        gray: '#888780',
        'gray-l': '#F1EFE8',
        'gray-d': '#444441',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
