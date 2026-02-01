/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#4C8DFF",
          400: "#6FA4FF",
          100: "#EAF1FF",
        },
        text: {
          primary: "#111111",
          secondary: "#6B7280",
          disabled: "#9CA3AF",
        },
        bg: {
          screen: "#F7F8FA",
          card: "#FFFFFF",
          highlight: "#EEF4FF",
        },
        border: {
          DEFAULT: "#E5E7EB",
          active: "#4C8DFF",
        },
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        full: "999px",
      },
      spacing: {
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        20: "20px",
        24: "24px",
      },
      fontFamily: {
        sans: ["SF Pro Text", "Roboto", "System"],
      },
      fontSize: {
        "title-lg": ["20px", { lineHeight: "26px" }],
        "title-md": ["16px", { lineHeight: "22px" }],
        "body-md": ["14px", { lineHeight: "20px" }],
        "body-sm": ["12px", { lineHeight: "18px" }],
        caption: ["11px", { lineHeight: "16px" }],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
