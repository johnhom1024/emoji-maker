const createPreset = require('./tailwind.preset');

module.exports = {
  presets: [
    createPreset({ unit: 'rpx' }),
  ],
  mode: "jit",
  purge: [
    './src/**/*.{vue,html,tsx,jsx,ts,js,wxs,sjs}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
