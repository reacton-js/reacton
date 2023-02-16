const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    hot: true,
    proxy: {
      '/': `http://localhost:${process.env.PORT || 3000}`,
    },
  },
  module: {
    rules: [
      {
        test: /\.html?$/,
        loader: "html-loader",
        options: {
          sources: false,
        },
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  plugins: [],
}

module.exports = (env, argv) => {
  /* определить режим запуска Webpack
    define Webpack startup mode */
  config.mode = (argv.mode == 'production') ? 'production' : 'development'

  /* добавить плагин HtmlWebpackPlugin для режима разработки
    add HtmlWebpackPlugin plugin for development mode */
  if (config.mode == 'development') {
    config.plugins.push(new HtmlWebpackPlugin({ template: './src/index.html' }))
  }

  return config
}