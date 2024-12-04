/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customColor: {
          lightBlue: "#03f8fc",
          blue: "#47acbe",
          darkBlue: "#17647e",
          coldBlue: "#191F31",
          lightOranye: "#F0944C",
          oranye: "#e96127",
          cream: "#fcecca",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
