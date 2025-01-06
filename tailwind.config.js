/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        lato: "Lato, sans-serif",
        sans: "Open Sans, sans-serif",
        mont: "Montserrat, sans-serif",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        primaryDark: "#1B1C22", // Define your --primary-dark value
        primaryMain: "#2D2E36", // Define your --primary-main value
      },
      gradientColorStops: {
        "gradient-1": "hsl(var(--gradient-1))",
        "gradient-2": "hsl(var(--gradient-2))",
        "gradient-3": "hsl(var(--gradient-3))",
        "gradient-4": "hsl(var(--gradient-4))",
      },
      backgroundImage: {
        // Blue gradients
        "blue-gradient":
          "linear-gradient(to right, hsl(var(--gradient-1)), hsl(var(--gradient-2)))",
        "blue-gradient-vertical":
          "linear-gradient(to bottom, hsl(var(--gradient-1)), hsl(var(--gradient-2)))",
        "blue-gradient-diagonal":
          "linear-gradient(to bottom right, hsl(var(--gradient-1)), hsl(var(--gradient-2)))",

        // Green gradients
        "green-gradient":
          "linear-gradient(to right, hsl(var(--gradient-3)), hsl(156, 84%, 61%))",
        "green-gradient-vertical":
          "linear-gradient(to bottom, hsl(var(--gradient-3)), hsl(156, 84%, 61%))",
        "green-gradient-diagonal":
          "linear-gradient(to bottom right, hsl(var(--gradient-3)), hsl(156, 84%, 61%))",

        // Purple gradients
        "purple-gradient":
          "linear-gradient(to right, hsl(var(--gradient-4)), hsl(245, 80%, 84%))",
        "purple-gradient-vertical":
          "linear-gradient(to bottom, hsl(var(--gradient-4)), hsl(245, 80%, 84%))",
        "purple-gradient-diagonal":
          "linear-gradient(to bottom right, hsl(var(--gradient-4)), hsl(245, 80%, 84%))",

        // Chart area gradients
        "chart-gradient":
          "linear-gradient(180deg, hsla(var(--chart-1), 0.2), hsla(var(--chart-1), 0))",
        "chart-gradient-reverse":
          "linear-gradient(0deg, hsla(var(--chart-1), 0.2), hsla(var(--chart-1), 0))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
