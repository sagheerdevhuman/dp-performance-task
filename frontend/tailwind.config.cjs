/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [  "./index.html", "./src/**/*.{js,ts,jsx,tsx}","./node_modules/react-tailwindcss-select/dist/index.esm.js","./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"],
  theme: {
    colors: {
      white:"#ffff",
        gray:{
          50:"#f9fafb",
          100:"#f3f4f6",
          200:"#e5e7eb",
          300:"#d1d5db",
          400:"#9ca3af",
          500:"525252",
          600:"#FFF",
          700:"#374151",
          800:"#1f2937",
          900:"#111827",
        },
        slate:{
          300:"#cbd5e1",
          400:"#94a3b8",
          500:"#64748b",
          600:"#475569",
          600:"#d1d5db",
          800:"#ffff",
          900:"#0f172a",
        },
        blue:{
          50:"#FFB570",
          100:"#FFB570",
          200:"#FFB570",
          300:"#F07500",
          400:"#FF7000",
          500:"#FF7000",
          600:"#FF7000",
          700:"#FF7000",
          800:"#FF7000",
          900:"#FF7000",
        },

      
      tkh: {
        brand: {
          purple: {
            1: "#8584B1",
            2: "#584F91",
            3: "#302456",
            4: "#291B4B",
            5: "3E4265",
          },
          teal: {
            1: "#23A5A9",
            2: "#1F8298",
            3: "#186577",
            4: "#134F5C",
          },
          tangerine: {
            1: "#FFB570",
            2: "#FFA047",
            3: "#FF8B1F",
            4: "#F07500",
            5: "#FF7000",
          },
          gold: {
            1: "#FFDE85",
            2: "#FFD65C",
            3: "#FFCC33",
            4: "#FFC20A",
          },
          black: {
            1: "#000000",
            
          },
        },
        grayscale: {
          0: "#F9FAFB",
          1: "#F9F9F9",
          2: "#EFEFEF",
          3: "#E7E7E7",
          4: "#D2D2D6",
          5: "#B4B4BB",
          6: "#9696AO",
          7: "#787885",
          8: "#5A5B6A",
          9: "#525252",
          10: "#343434",
          11:"#F3F6FF",
        },
        bg:{
          0:"#131022",
          1:"#F3F6FF"
        },
        solid: {
          0: "#FFFFFF",
        },
      },
    },
    extend: {
      dropShadow: {
          'btn': '0px 4px 9px  rgba(255, 112, 0, 0.5)',
          'card': '0px 4.4px 12px  rgba(19, 16, 34, 0.6)',
          'card-2': '2px 6.4px -1px  rgba(19, 16, 34, 0.3)',
          'reg':'0px 2px 6.4px -1px rgba(19, 16, 34, 0.03)',
          'reg2':'0px 4.4px 12px -1px rgba(19, 16, 34, 0.06)',
          'tang-2':'0px 8px 18px -8px #FF7000'
      },
      fontFamily: {
        'lato': ['"Lato"', 'serif'],
      },
    },
  },
  utilities: {
    '.no-scrollbar::-webkit-scrollbar': {
      display: 'none',
    },
    '.no-scrollbar': {
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
    }
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      borderColor: ["focus-visible", "first"],
      textColor: ["visited"],
    },
  },
  plugins: [require("@tailwindcss/forms", "@tailwindcss/aspect-ratio")],
});
