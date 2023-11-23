import type { Config } from "tailwindcss";

const tailwindConfig: Config = {
  content: ["./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      fontFamily: {
        GT_Alpina: ["var(--font-GT_Alpina)"],
        comfortaa: ["var(--font-comfortaa)"]
      },
      colors: {
        "white-dark": "#bdbdc5",
        "white-full-dark": "#777777",
        primary: "#4840bb",
        "primary-dark": "#230b59",
        "primary-full-dark": "#18172b",
        danger: "#b30015",
        "ambient-peach": "#f7e9e2",
        "ambient-lavender": "#dadef1"
      }
    }
  },
  plugins: []
};
export default tailwindConfig;
