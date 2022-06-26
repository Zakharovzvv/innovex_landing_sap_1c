const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { resolve } = require('@babel/core/lib/vendor/import-meta-resolve');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: ['@babel/polyfill', './index.ts'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new HTMLWebpackPlugin({ template: './index.html' }),
    new CleanWebpackPlugin(),
    //    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          //          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              //            sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              //              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif)$/,
        type: 'asset/resource',
        // generator: {
        //   filename: '[path][name].[hash][ext][query]',
        // },
      },
      // {
      //   test: /\.(jpg|jpeg|png|svg|gif|json)/,
      //   use: ['file-loader'],
      // },
      {
        test: /\.(js|ts|jsx|tsx)$/, // m?jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  // optimization: {
  //   minimize: false,
  //   minimizer: [new TerserWebpackPlugin()],
  // },
};
