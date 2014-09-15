var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    bundle: ["!bootstrap-webpack!./assets/bootstrap.config.js",
              './assets/javascripts/entry.jsx']},
  output: {
    filename: './static/js/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/,  loader: 'jsx-loader' },
      { test: /\.woff$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.ttf$/,  loader: "file-loader" },
      { test: /\.eot$/,  loader: "file-loader" },
      { test: /\.svg$/,  loader: "file-loader" }
    ]
  },

  plugins: [
    new webpack.IgnorePlugin(/vertx/)
  ]
}
