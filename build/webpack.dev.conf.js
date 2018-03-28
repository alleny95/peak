var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// let online = 'http://waimai.baidu.com'
// let gangTest = 'http://10.19.161.122:8185'

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
  // devServer: {
  //   proxy: { // proxy URLs to backend development server
  //     '/vendor/sku/getskulist': {
  //       target: gangTest,
  //       changeOrigin: true
  //     }
  //   },
  //   historyApiFallback: true,
  //   overlay: true,
  //   host: '0.0.0.0',
  //   port: 8080,
  //   disableHostCheck: true,
  //   noInfo: true,
  //   // useLocalIp: true,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE',
  //     'Access-Control-Allow-Headers': 'application/json; charset=UTF-8'
  //   }
  // }
})
