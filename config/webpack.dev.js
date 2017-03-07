/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-06
 */

process.env.NODE_ENV = 'dev';

var path = require('path');
var baseConfig = require('./index');
var webpackBaseConfig = require('./webpack.base');
var webpack = require('webpack');
var openBrowserPlugin = require('open-browser-webpack-plugin');


// 页面自动刷新, 具体参考 http://webpack.github.io/docs/webpack-dev-server.html

const pageAutoRefreshSupportString = 'webpack-dev-server/client?http://'
                                      + baseConfig.dev.hostname + ':' + baseConfig.dev.port;
const HMRSupportString = 'webpack/hot/dev-server';

Object.keys(webpackBaseConfig.entry).forEach(function (value) {
  baseConfig.dev.hot && webpackBaseConfig.entry[value].unshift(HMRSupportString);
  webpackBaseConfig.entry[value].unshift(pageAutoRefreshSupportString);
});

baseConfig.dev.hot && webpackBaseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

// 本地开发服务器启动后浏览器自动打开

webpackBaseConfig.plugins.push(new openBrowserPlugin({
  url: 'http://' + baseConfig.dev.hostname + ':' + baseConfig.dev.port,
  ignoreErrors: true
}));

module.exports = webpackBaseConfig;
