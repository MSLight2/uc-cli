var path = require('path');
const config =  require('./config')
const merge = require('webpack-merge');
const WebpackBaseConfig = require('./webpack.base.conf');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(WebpackBaseConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    // 压缩css文件
    new OptimizeCSSPlugin(),
    // 将打包好的js、css文件插入index.html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '..', 'public/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ],
  optimization: {
    minimizer: [
      // 压缩js文件
      new UglifyJsPlugin({
        sourceMap: config.build.sourceMap,
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true
          },
          output: {
            beautify: false,
            keep_quoted_props: true
          }
        }
      })
    ],
    // 提取公共文件(webpack 4.x已删除CommonsChunkPlugin改用SplitChunksPlugin)
    splitChunks: {
      automaticNameDelimiter: '-',
      chunks: 'all',
      cacheGroups: {
        // 所有第三方js打包到 vendor.js 如要分打包，去掉 name 属性或手动配置
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendors",
          priority: 10,
          enforce: true
        },
        commons: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests : 5,
          minSize: 0,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: "single"
  }
})
