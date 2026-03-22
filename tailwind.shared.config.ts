///** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';
import defaultTheme from "tailwindcss/defaultTheme"
import activeColors from "tailwindcss/colors"
import plugin from "tailwindcss/plugin"
import typography from "@tailwindcss/typography"
import animate from "tailwindcss-animate"
import scrollBarHide from "tailwind-scrollbar-hide"
import { themeColors, backgroundImage } from './tailwind-proc-theme';

// TailwindCSS has deprecated some colors, so we need to remove them before spreading the colors object.
// const {...activeColors } = colors

export const deprecatedColors = ['lightBlue', 'warmGray', 'trueGray', 'coolGray', 'blueGray']

const config: Omit<Config, "content"> = {
  darkMode: ["class", '[data-color-scheme="dark"]'],
  theme: {
    // colors: {
    //   'black-rock': {
    //     '0': '#0b0d33',
    //     '50': '#ebf2ff',
    //     '100': '#dae8ff',
    //     '200': '#bdd3ff',
    //     '300': '#95b5ff',
    //     '400': '#6b8bff',
    //     '500': '#4961ff',
    //     '600': '#2935ff',
    //     '700': '#1d24e5',
    //     '800': '#1b24b8',
    //     '900': '#1f2890',
    //     '950': '#0b0d33',
    //   },
    //   'medium-purple': {
    //     '0': '#8759f2',
    //     '50': '#f5f3ff',
    //     '100': '#ede9fe',
    //     '200': '#ded7fd',
    //     '300': '#c5b7fb',
    //     '400': '#a88ef7',
    //     '500': '#8759f2',
    //     '600': '#7c3ee9',
    //     '700': '#6d2cd5',
    //     '800': '#5b24b3',
    //     '900': '#4c2092',
    //     '950': '#2f1263',
    //   },
    //   'violet-red': {
    //     '0': '#ff3c82',
    //     '50': '#fef1f6',
    //     '100': '#fee5f0',
    //     '200': '#ffcae2',
    //     '300': '#ff9fc8',
    //     '400': '#ff63a2',
    //     '500': '#ff3c82',
    //     '600': '#f01257',
    //     '700': '#d1053e',
    //     '800': '#ad0734',
    //     '900': '#8f0c2f',
    //     '950': '#580016',
    //   },
    //   'viking': {
    //     '0': '#01d4e7',
    //     '50': '#ecffff',
    //     '100': '#cefeff',
    //     '200': '#a3fbfe',
    //     '300': '#63f5fd',
    //     '400': '#1de4f3',
    //     '500': '#01d4e7',
    //     '600': '#049fb6',
    //     '700': '#0b7f93',
    //     '800': '#136577',
    //     '900': '#145465',
    //     '950': '#073845',
    //   },
    //   'supernova': {
    //     '0': '#fec400',
    //     '50': '#ffffea',
    //     '100': '#fffcc5',
    //     '200': '#fffb85',
    //     '300': '#fff246',
    //     '400': '#ffe41b',
    //     '500': '#fec400',
    //     '600': '#e29800',
    //     '700': '#bb6d02',
    //     '800': '#985408',
    //     '900': '#7c440b',
    //     '950': '#482300',
    //   },

    // },
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
        'main-hover': {
          raw: '(hover: hover)'
        }

      },
      backgroundImage: backgroundImage,
      colors: {
        blackRock: {
          '0': '#0b0d33',
          '50': '#ebf2ff',
          '100': '#dae8ff',
          '200': '#bdd3ff',
          '300': '#95b5ff',
          '400': '#6b8bff',
          '500': '#4961ff',
          '600': '#2935ff',
          '700': '#1d24e5',
          '800': '#1b24b8',
          '900': '#1f2890',
          '950': '#0b0d33',
          DEFAULT: '#0b0d33',
        },
        mediumPurple: {
          '0': '#8759f2',
          '50': '#f5f3ff',
          '100': '#ede9fe',
          '200': '#ded7fd',
          '300': '#c5b7fb',
          '400': '#a88ef7',
          '500': '#8759f2',
          '600': '#7c3ee9',
          '700': '#6d2cd5',
          '800': '#5b24b3',
          '900': '#4c2092',
          '950': '#2f1263',
        },
        violetRed: {
          '0': '#ff3c82',
          '50': '#fef1f6',
          '100': '#fee5f0',
          '200': '#ffcae2',
          '300': '#ff9fc8',
          '400': '#ff63a2',
          '500': '#ff3c82',
          '600': '#f01257',
          '700': '#d1053e',
          '800': '#ad0734',
          '900': '#8f0c2f',
          '950': '#580016',
        },
        viking: {
          '0': '#01d4e7',
          '50': '#ecffff',
          '100': '#cefeff',
          '200': '#a3fbfe',
          '300': '#63f5fd',
          '400': '#1de4f3',
          '500': '#01d4e7',
          '600': '#049fb6',
          '700': '#0b7f93',
          '800': '#136577',
          '900': '#145465',
          '950': '#073845',
        },
        supernova: {
          '0': '#fec400',
          '50': '#ffffea',
          '100': '#fffcc5',
          '200': '#fffb85',
          '300': '#fff246',
          '400': '#ffe41b',
          '500': '#fec400',
          '600': '#e29800',
          '700': '#bb6d02',
          '800': '#985408',
          '900': '#7c440b',
          '950': '#482300',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        themePrimary: 'hsl(var(--theme-pri`mary))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        brand: {
          DEFAULT: 'hsl(var(--brand))',
          foreground: 'hsl(var(--brand-foreground))'
        },
        highlight: {
          DEFAULT: 'hsl(var(--highlight))',
          foreground: 'hsl(var(--highlight-foreground))'
        },
        ...themeColors,
        ...activeColors,
      },
      fontFamily: {
        monoLisa: ['monolisa'],
        jetbrains: ['JetBrains Mono'],
        atkinson: ['Atkinson Hyperlegible', ...defaultTheme.fontFamily.sans],
        inder: ['Inder', ...defaultTheme.fontFamily.sans],
        sans: ['Inter',
          ...defaultTheme.fontFamily.sans],
        canela: ['Canela', ...defaultTheme.fontFamily.sans]
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
    }
  },
  plugins: [
    typography,
    plugin(function ({ matchVariant }) {
      matchVariant("theme", (theme) => { return `[data-theme='${theme}'] &` }, {
        values: {
          proc: 'proc',
          doflo: 'doflo',
        }
      });
    }),
    // plugin(function ({ matchVariant }) {
    //   matchVariant("color-scheme", (scheme) => { return `[color-scheme='${scheme}'] &` }, {
    //     values: {
    //       light: 'light',
    //       dark: 'dark'
    //     }
    //   });
    // }),
    plugin(function ({ addVariant }) {
      addVariant("has-scrolled", ".has-scrolled &");
    }),
    plugin(function ({ addVariant }) {
      addVariant("app-global-mast", ".app-global-mast &");
    }),
    plugin(function ({ addVariant }) {
      addVariant("app-collapse-left", ".app-collapse-left &");
    }),
    plugin(function ({ addVariant }) {
      addVariant("app-drawer-open", ".app-drawer-open &");
    }),
    plugin(function ({ addVariant }) {
      addVariant("app-hide-left", ".app-hide-left &");
    }),
    plugin(function ({ addVariant }) {
      addVariant("menu", ".MuiPopover-root &");
    }),
    plugin(function ({ addVariant }) {
      addVariant("selected", "&.selected");
    }),
    animate,
    scrollBarHide
  ]
} satisfies Omit<Config, "content">;
export default config;
