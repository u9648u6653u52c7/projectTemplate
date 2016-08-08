/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-06
 */

var webpack = require('webpack');
var merge = require('webpack-merge');
var openBrowserPlugin = require('open-browser-webpack-plugin');
var t = require('../shell/utils');
var conf = require('./index');
var webpackBaseConfig = require('./webpack.base');

webpackBaseConfig.entry = null;

module.exports = merge(webpackBaseConfig, {
  entry: (function () {
    var entries = t.getEntries(conf.dev.entryFileDir, conf.entryKeyType);

    for ( var key in entries ) {
      if ( entries.hasOwnProperty(key) ) {
        entries[key] = ['webpack-dev-server/client?http://localhost:' + conf.dev.port + '/'
          , "webpack/hot/dev-server"].concat(entries[key]);
      }
    }

    return entries;
  })(),

  plugins: [
    new openBrowserPlugin({
      url: 'http://localhost:' + conf.dev.port
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  devtool: '#eval-source-map'
});
