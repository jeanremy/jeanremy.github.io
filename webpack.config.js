const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const autoprefixer = require('autoprefixer')
const fileLoader = require('file-loader')
const pxToRem = require('postcss-pixels-to-rem')
const htmlLoader = require('html-loader')
const Dotenv = require('dotenv-webpack')
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
  },
  // externals: ['tls', 'net', 'fs'],
  devtool: isDevelopment && 'source-map',
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, './src'),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              attrs: ['img:src', 'link:href'],
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browsers: ['last 2 versions'],
              },
              sourceMap: isDevelopment,
              plugins: () => [autoprefixer, pxToRem],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|webmanifest|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './',
              useRelativePath: true,
              esModule: false,
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './fonts/',
              useRelativePath: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv(),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      hash: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        caseSensitive: true,
        removeComments: true,
      },
    }),
  ],
}
