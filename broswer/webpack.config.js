const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'index'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'js/[name].[hash:6].js',
    clean: true,
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      exclude: [
        path.resolve(__dirname, 'node_modules'),
      ],
      use: {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    },
    {
      test: /.css$/,
      include: [
        path.resolve(__dirname, 'src'),
      ],
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    },
    ],
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
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
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
