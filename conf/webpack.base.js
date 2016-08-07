/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-04
 */

var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var t = require('../shell/utils');
var config = require('./index');

var common = {
	entry: t.getEntries('../src'),
	output: {
		path: path.resolve(config.projectRoot, 'dist'),
		publicPath: '/assets/',
		filename: '[name].js',
		chunkFilename: '[id].chunk.js'
	},
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				loader: "eslint",
				exclude: /node_modules/
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				loader: 'babel',
				query: {
					presets: ['es2015'],
					plugins: ['transform-runtime'],
					cacheDirectory: true
				},
				include: path.resolve(config.projectRoot, 'src'),
				exclude: /node_modules/
			},
			{
				test: require.resolve('zepto'),
				loader: 'exports?window.Zepto!script'
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.hbs$/,
				loader: "handlebars-template"
			},
			{
				test: /\.html$/,
				loader: 'html'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style", "css")
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
				}
			}
		]
	},
	plugins: [
		// new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),
		new ExtractTextPlugin("[name].css")
	],
	eslint: {
		configFile: path.resolve(config.projectRoot, '.eslintrc.js'),
		formatter: require("eslint-friendly-formatter")
	},
	node: {
		fs: "empty" // avoids error messages
	}

};


module.exports = webpackMerge(common, {});
