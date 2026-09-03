import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        kape: {
          brown: "#2E1F19",
          cream: "#EDE8DF",
          green: "#C2D194",
          sand: "#F5F3EF",
          text: "#66615C",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)"],
      },
    },
  },
  plugins: [],
};
export default config;
