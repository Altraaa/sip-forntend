/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "toast-slide-in": {
          "0%": {
            transform: "translate(-50%, -100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translate(-50%, 0)",
            opacity: "1",
          },
        },
        "toast-slide-out": {
          "0%": {
            transform: "translate(-50%, 0)",
            opacity: "1",
          },
          "100%": {
            transform: "translate(-50%, 100%)",
            opacity: "0",
          },
        },
      },
      animation: {
        "toast-slide-in": "toast-slide-in 0.3s ease-out forwards",
        "toast-slide-out": "toast-slide-out 0.3s ease-in forwards",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tailwindcss-animate"),
  ],
};
