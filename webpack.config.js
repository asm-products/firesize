var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    bundle: ["!bootstrap-webpack!./assets/bootstrap.config.js",
              './assets/javascripts/entry.jsx']},
  output: {
    path: __dirname + "/static",
    publicPath: "",
    filename: "js/[name].js",
    chunkFilename: "js/[id].js"
  },
  resolve: {
    modulesDirectories: ['node_modules', 'assets'],
    fallback: ['./assets']
  },
  module: {
    loaders: [
      { test: /\.css/, loader: "style-loader!css-loader" },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.gif/, loader: "url-loader?limit=10000&minetype=image/gif" },
      { test: /\.jpg/, loader: "url-loader?limit=10000&minetype=image/jpg" },
      { test: /\.png/, loader: "url-loader?limit=10000&minetype=image/png" },
      
      { test: /\.jsx$/,  loader: 'jsx-loader?harmony' },
      { test: /\.woff$/, loader: "url-loader?name=fonts/[hash].[ext]&limit=10000&minetype=application/font-woff" },
      { test: /\.ttf$/,  loader: "file-loader?name=fonts/[hash].[ext]" },
      { test: /\.eot$/,  loader: "file-loader?name=fonts/[hash].[ext]" },
      { test: /\.svg$/,  loader: "file-loader?name=fonts/[hash].[ext]" }
    ]
  },

  plugins: [
    new webpack.IgnorePlugin(/vertx/)
  ]
}
