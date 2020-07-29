module.exports = {
  plugins: [
    require('stylelint')(),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-preset-env')({ stage: 0 }),
  ],
}
