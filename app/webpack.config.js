const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.html?$/,
        loader: "html-loader",
        options: {
          sources: false
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  plugins: []
}

module.exports = (env, argv) => {
  config.mode = argv.mode === 'production' ? 'production' : 'development'

  if (config.mode === 'development') {
    config.plugins.push(new HtmlWebpackPlugin({
      template: './src/index.html'
    }))
  }

  return config
}