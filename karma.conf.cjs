const path = require('node:path')

module.exports = (config) => {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    files: ['src/Test/**/*.test.tsx'],
    preprocessors: {
      'src/Test/**/*.test.tsx': ['webpack'],
    },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
      module: {
        rules: [
          {
            test: /\.[jt]sx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: 'defaults' }],
                  ['@babel/preset-react', { runtime: 'automatic' }],
                  '@babel/preset-typescript',
                ],
                plugins: [[
                  'istanbul',
                  {
                    include: [
                      '**/src/componentes/**/*.ts',
                      '**/src/componentes/**/*.tsx',
                      '**/src/utilidades.ts',
                    ],
                    exclude: ['**/src/Test/**'],
                  },
                ]],
              },
            },
          },
        ],
      },
    },
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'text-summary' },
        { type: 'html', subdir: 'html' },
        { type: 'json', subdir: '.' },
      ],
      include: ['src/componentes/**/*.ts', 'src/componentes/**/*.tsx', 'src/utilidades.ts'],
      exclude: ['src/Test/**'],
    },
    reporters: ['progress', 'coverage'],
    browsers: ['jsdom'],
    singleRun: true,
    restartOnFileChange: false,
  })
}