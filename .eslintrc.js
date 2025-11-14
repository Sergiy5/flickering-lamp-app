module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['react', 'react-hooks', 'react-native'],
  settings: {
    'import/resolver': {
      'babel-module': {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@assets': './src/assets',
          '@services': './src/services',
          '@constants': './src/constants',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'react-native/no-inline-styles': 'off', // Optional: if you want to allow inline styles
  },
};
