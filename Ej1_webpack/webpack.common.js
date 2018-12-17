const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var basePath = __dirname;
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  context: path.join(basePath, 'src'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css'],
  },
  entry: {
    app: './main.tsx',
    appStyles: [
      './content/mystyles.scss'
    ],
    vendor: [
      'jquery'
    ],
    vendorStyles: [
      '../node_modules/bootstrap/dist/css/bootstrap.css',
    ],
  },
  output: {
    filename: '[name].[chunkhash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
          "babelCore": "@babel/core", // needed for Babel v7
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=5000'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', 
      template: 'index.html', 
      hash: true,
    }),
    //new BundleAnalyzerPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),

    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFile: '[id].css'
    })
  ],
}