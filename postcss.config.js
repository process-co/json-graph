// If you want to use other PostCSS plugins, see the following:
// https://tailwindcss.com/docs/using-with-preprocessors

module.exports = {
  plugins: {
    "@tailwindcss/postcss": {}
    // {
    //   // content: ["./**/*.tsx", "./**/*.jsx", "./**/*.js", "./**/*.ts"],
    //   content: ["!./src/assets/loaders/*.{ts,tsx,js,jsx}", "./src/**/*.{ts,tsx,js,jsx}"],
    // },
    // "tailwindcss/nesting": {},
    // "postcss-import": {},
    // ...(process.env && process.env.NODE_ENV === "production" ? {} : {}),
  },
};
