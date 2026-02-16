module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@src': './src',
          '@app': './src/app',
          '@pages': './src/pages',
          '@features': './src/features',
          '@entities': './src/entities',
          '@shared': './src/shared',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    ],
    ['module:react-native-dotenv'],
  ],
};
