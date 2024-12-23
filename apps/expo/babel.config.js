module.exports = function (api) {
  api.cache(true)
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      'react-native-reanimated/plugin',
      [
        require.resolve('babel-plugin-module-resolver'),
        {
          root: ['../..'],
          alias: {
            // define aliases to shorten the import paths
            app: '../../packages/app',
            '@siva/ui': '../../packages/ui',
          },
          extensions: ['.js', '.jsx', '.tsx', '.ios.js', '.android.js'],
        },
      ],
      // if you want reanimated support
      // 'react-native-reanimated/plugin',
      // ...(process.env.EAS_BUILD_PLATFORM === 'android'
      //   ? []
      //   : [
      //       [
      //         {
      //           components: ['@siva/ui'],
      //           config: '../../packages/config/src/t_amagui.config.ts',
      //           logTimings: true,
      //           disableExtraction: process.env.NODE_ENV === 'development',
      //         },
      //       ],
      //     ]),
    ],
  }
}
