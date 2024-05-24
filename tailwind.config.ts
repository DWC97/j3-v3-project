import type { Config } from "tailwindcss";

const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-pink':'#ec2aa2',
        'custom-blue':'#108690',
        'custom-yellow':'#FCCF14',
        'custom-orange':'#d19c2a',
        'custom-red':'#ca1111',
      },
      screens: {
        'tall': { 'raw': '(min-height: 850px)' },
        'vtall': { 'raw': '(min-height: 1030px)' },
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
