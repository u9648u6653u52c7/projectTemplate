/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-06
 */

var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var openBrowserPlugin = require('open-browser-webpack-plugin');
var t = require('../shell/utils');
var conf = require('./index');
var webpackBaseConfig = require('./webpack.base');
var entries = webpackBaseConfig.entry;
webpackBaseConfig.entry = null;

webpackBaseConfig.plugins = t.createHtmlByHtmlWebpackPlugin(entries, {
	baseName: conf.tplBaseName,
	filters: ['vendor'],
	chunks: ['vendor', 'common']
});

var config = {
	entry: (function (entries) {
		for ( var key in entries ) {
			if ( entries.hasOwnProperty(key) ) {
				entries[key] = ['webpack-dev-server/client?http://' + conf.dev.hostname + ':' + conf.dev.port,
					"webpack/hot/dev-server"].concat(entries[key]);
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
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/common.js',
			minChunks: 3,
			chunks: _.filter(_.keys(entries), function (value) {
				return !(/vendor/.test(value));
			})
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'js/vendor.js',
			chunks: ['common'],
			minChunks: Infinity
		}),
		new ExtractTextPlugin("css/[name].css", {allChunks: true}),
		new webpack.HotModuleReplacementPlugin(),
		new openBrowserPlugin({url: 'http://' + conf.dev.hostname + ':' + conf.dev.port})
	],
	eslint: {
		configFile: path.resolve(conf.projectRoot, '.eslintrc.js'),
		formatter: require("eslint-friendly-formatter")
	},
	devtool: '#eval-source-map'
};

module.exports = merge(webpackBaseConfig, config);
