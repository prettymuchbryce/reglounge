var path = require('path')

module.exports = {
  // entry: ['./node_modules/pixi.js/bin/pixi.js', './src/main.js'],
  entry: './src/main.js',
  output: {
    path: './static',
    filename: 'js/all.js'
  },
  node: {
    fs: 'empty'
  },
  module: {
    preLoaders: [
      {
        // set up standard-loader as a preloader
        test: /\.js$/,
        loader: 'standard',
        exclude: /(node_modules)/
      }
    ],
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', query: { presets: ['es2015', 'stage-0'] } },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader' },
      {
        test: /\.json$/,
        include: path.join(__dirname, 'node_modules', 'pixi.js'),
        loader: 'json'
      }
    ],
    postLoaders: [
      {
        include: path.resolve(__dirname, 'node_modules/pixi.js'),
        loader: 'ify'
      }
    ]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.json']
  }
}
