import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textShadow: {
        'default': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 0.5)',
      },
      screens: {
        'custom': '1450px',
        'custom-1534': '1534px'
      },
      inset: {
        '5perc': '10%',
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
};

export default config;
