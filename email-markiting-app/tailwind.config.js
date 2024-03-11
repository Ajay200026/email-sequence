/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBackgroundColor: "#5d7e7e",
        columnBackgroundColor: "#bfbfbf",
      },
    },
  },
  plugins: [],
};
