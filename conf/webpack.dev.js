/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-06
 */

var webpackBaseConfig = require('./webpack.base');
var entry = webpackBaseConfig.entry;
var webpack = require('webpack');
var merge = require('webpack-merge');

for ( var key in entry ) {
    if ( entry.hasOwnProperty(key) ) {
        entry[key] = ["webpack-dev-server/client?http://localhost:8080/",
            "webpack/hot/dev-server"].concat(entry[key]);
    }
}

module.exports = merge(webpackBaseConfig, {
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: '#eval-source-map'
});