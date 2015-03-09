var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: { bundle: ['./assets/javascripts/entry.jsx'] },
  output: {
    path: path.join(__dirname, "static"),
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
      { test: /\.s?css/, loader: "style-loader!css-loader!sass-loader?&includePaths[]=" + (path.resolve(__dirname, "./node_modules")) },
      { test: /\.gif/, loader: "url-loader?limit=10000&mimetype=image/gif" },
      { test: /\.jpg/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
      { test: /\.png/, loader: "url-loader?limit=10000&mimetype=image/png" },
      { test: /\.jsx$/,  loader: 'jsx-loader?harmony' },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff2" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/)
  ]
}
