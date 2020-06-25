const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '.', 'src')
    }
  },

  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    contentBase: './public',
    hot: true
  },

  devtool: 'eval-source-map'
};
