/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {},
  },
  plugins: [
    /** @type {import('tailwindcss/types/config').PluginCreator} */
    ({ addUtilities }) => {
      // these will appear in vscode class name autosuggestions
      addUtilities({});
    },
  ],
};
