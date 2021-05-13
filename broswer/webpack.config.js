const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: path.join(__dirname, 'index'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[contenthash].[name].js',
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
      loader: 'babel-loader',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
  cache: true,
  devtool: process.env.NODE_ENV === 'development' ? 'eval-cheap-source-map' : 'hidden-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    open: true,
    hot: true,
    port: 8000,
  },
};
