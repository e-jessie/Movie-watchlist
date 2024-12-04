/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "heading-1": ["3rem", { lineHeight: "3.6rem", fontWeight: 700 }], // 48px -> 3rem, 57.6px -> 3.6rem
        "heading-2": ["2.5rem", { lineHeight: "3rem", fontWeight: 700 }], // 40px -> 2.5rem, 48px -> 3rem
        "heading-3": ["2rem", { lineHeight: "2.4rem", fontWeight: 600 }], // 32px -> 2rem, 38.4px -> 2.4rem
        "heading-4": ["1.5rem", { lineHeight: "1.8rem", fontWeight: 600 }], // 24px -> 1.5rem, 28.8px -> 1.8rem
        "heading-5": ["1.125rem", { lineHeight: "1.35rem", fontWeight: 500 }], // 18px -> 1.125rem, 21.6px -> 1.35rem
        "heading-6": ["1.5rem", { lineHeight: "1.8rem", fontWeight: 700 }], // 24px -> 1.5rem, 28.8px -> 1.8rem
        "heading-7": ["1.5rem", { lineHeight: "1.8rem", fontWeight: 400 }], // 24px -> 1.5rem, 28.8px -> 1.8rem
        "heading-8": ["1.125rem", { lineHeight: "1.4rem", fontWeight: 600 }], // 18px -> 1.125rem, 22.41px -> 1.4rem
        "heading-9": ["2rem", { lineHeight: "2.4rem", fontWeight: 700 }], // 32px -> 2rem, 38.4px -> 2.4rem
        "body-1": ["1rem", { lineHeight: "1.2rem", fontWeight: 400 }], // 16px -> 1rem, 19.2px -> 1.2rem
        "body-2": ["0.875rem", { lineHeight: "1.05rem", fontWeight: 400 }], // 14px -> 0.875rem, 16.8px -> 1.05rem
        "body-3": ["0.75rem", { lineHeight: "0.9rem", fontWeight: 400 }], // 12px -> 0.75rem, 14.4px -> 0.9rem
        "body-4": ["0.625rem", { lineHeight: "0.75rem", fontWeight: 400 }], // 10px -> 0.625rem, 12px -> 0.75rem
        "body-5": ["0.75rem", { lineHeight: "0.9rem", fontWeight: 600 }], // 12px -> 0.75rem, 14.4px -> 0.9rem
        "body-6": ["0.875rem", { lineHeight: "1.05rem", fontWeight: 700 }], // 14px -> 0.875rem, 16.8px -> 1.05rem
        "body-7": ["0.875rem", { lineHeight: "1.05rem", fontWeight: 500 }], // 14px -> 0.875rem, 16.8px -> 1.05rem
        "body-8": ["0.875rem", { lineHeight: "1.05rem", fontWeight: 600 }], // 14px -> 0.875rem, 16.8px -> 1.05rem
    },
      colors: {
          primary: {
              50: "#e5d5f2",
              100: "#d3b9ea",
              200: "#bd95df",
              300: "#a772d4",
              400: "#914fca",
              500: "#7B2CBF",
              600: "#67259f",
              700: "#521d7f",
              800: "#3e1660",
              900: "#290f40",
              950: "#190926",
          },
          secondary: {
              400: "#43A765",
          },
          neutral: {
              50: "#f7f7f7",
              100: "#f1f1f1",
              200: "#ebebeb",
              300: "#e4e4e4",
              400: "#dddddd",
              500: "#d6d6d6",
              600: "#b2b2b2",
              700: "#8f8f8f",
              800: "#6b6b6b",
              900: "#474747",
              950: "#2b2b2b",
          },
          gray: {
              50: "#D7D7D7",
              30: "#EAEAEA",
              'custom-gray': "#D6D6D6",
              60: "#B2B2B2",
              100: "#BDBDBD",
              200: "#9C9C9C",
              300: "#7B7B7B",
              400: "#5A5A5A",
              500: "#393939",
              600: "#303030",
              700: "#262626",
              800: "#1D1D1D",
              900: "#131313",
              950: "#0B0B0B",
          },
      },
    },
  },
  plugins: [],
};
