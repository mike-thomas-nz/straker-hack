/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractCss = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: '[name].css',
  chunkFilename: '[id].css'
});

module.exports = {
  entry: [
    'jquery',
    './src/main.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: [new HtmlWebpackPlugin({  // Also generate a test.html
    filename: 'index.html',
    template: 'src/index.html'
  }),
  new HtmlWebpackPlugin({  // Also generate a test.html
    filename: 'workbench.html',
    template: 'src/workbench/index.html'
  }),
  new HtmlWebpackPlugin({  // Also generate a test.html
    filename: 'admin.html',
    template: 'src/admin/index.html'
  }),
  new HtmlWebpackPlugin({  // Also generate a test.html
    filename: 'dashboard.html',
    template: 'src/dashboard/index.html'
  }),
  new HtmlWebpackPlugin({  // Also generate a test.html
    filename: 'logging.html',
    template: 'src/logging/index.html'
  }),
  extractCss],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: '../',
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader'
        ]
      }
    ]
  }
};
