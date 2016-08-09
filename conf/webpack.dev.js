/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-06
 */

var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var openBrowserPlugin = require('open-browser-webpack-plugin');
var t = require('../shell/utils');
var conf = require('./index');
var webpackBaseConfig = require('./webpack.base');
var entries = webpackBaseConfig.entry;

webpackBaseConfig.entry = null;

module.exports = merge(webpackBaseConfig, {
    entry: (function (entries) {
        for ( var key in entries ) {
          if ( entries.hasOwnProperty(key) ) {
            entries[key] = ['webpack-dev-server/client?http://' + conf.dev.hostname + ':' + conf.dev.port + '/'
              , "webpack/hot/dev-server"].concat(entries[key]);
          }
        }
        return entries;
    })(entries),
    module: {
        preLoaders: [
            {
                test: /\.jsx?$/,
                loader: "eslint",
                exclude: /node_modules|static/
            }
        ]
    },
    plugins: [
        new openBrowserPlugin({
            url: 'http://' + conf.dev.hostname + ':' + conf.dev.port
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    eslint: {
        configFile: path.resolve(conf.projectRoot, '.eslintrc.js'),
        formatter: require("eslint-friendly-formatter")
    },
    devtool: '#eval-source-map'
});
