var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = {
  devtool: 'eval-source-map',
  entry: ['whatwg-fetch', './src/index.js'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader', 'autoprefixer-loader']
        }),
        exclude: /node_modules/
      }, {
        test: /\.(jpeg|png|jpg)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [new ExtractTextPlugin('bundle.css')]
}

module.exports = config;;
