/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-06
 */

var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var t = require('../shell/utils');
var conf = require('./index');
var webpackBaseConfig = require('./webpack.base');
var entries = webpackBaseConfig.entry;
var chunkhash = t.generateHashString('chunkhash', conf.hashLength);

webpackBaseConfig.plugins = t.createHtmlByHtmlWebpackPlugin(entries, {  // HtmlWebpackPlugin也有需要优化的地方
	baseName: conf.tplBaseName,
	filters: ['vendor'],
	chunks: ['vendor', 'common']
});

var config = {
	output: {
		path: conf.prod.assetsRoot,
		publicPath: conf.prod.assetsPublicPath,
		filename: 'js/[name].' + chunkhash + '.js',
		chunkFilename: 'js/[id].' + chunkhash + '.js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			filename: 'js/common.' + chunkhash + '.js',
			minChunks: 3,
			chunks: _.filter(_.keys(entries), function (value) {
				return !(/vendor/.test(value));
			})
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'js/vendor.' + chunkhash + '.js',
			chunks: ['common'],
			minChunks: Infinity
		}),
		new ExtractTextPlugin('css/[name].' + t.generateHashString('contenthash', conf.hashLength) + '.css',
			{allChunks: true}
		)
	],
	devtool: '#source-map'
};

module.exports = merge.smart(webpackBaseConfig, config);