import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#bb86fc",
        primary_variant: "#3700b3",
        secondary: "#03dac6",
        error: "#cf6679",
        background: "#121212",
        borders: "#2F3336",
      },
    },
  },
  plugins: [],
} satisfies Config;
