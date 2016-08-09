/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-04
 */

var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var conf = require('./index');
var t = require('../shell/utils');

var config = {
    entry: t.getEntries(conf.entryFileDir, conf.entryKeyType),
	output: {
		path: conf.assetsRoot,
		publicPath: conf.publicPath,
		filename: '[name].js',
		chunkFilename: '[id].chunk.js'
	},
	module: {
		loaders: [
		{
			test: /\.jsx?$/,
			loader: 'babel',
			query: {
			  presets: ['react', 'es2015'],
			  plugins: ['transform-runtime'],
			  cacheDirectory: true
			},
			include: path.resolve(conf.projectRoot, 'src'),
			exclude: /node_modules/
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
			loader: 'html',
			query: {
				attrs: ['img:src', 'img:data-src'],
				interpolate: 'require'
			}
		},
		{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("style", "css")
		},
		{
			test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
			loader: 'url',
			query: {
		        limit: 8192,
				context: conf.entryFileDir,
				name: '[path][name].[ext]'
			}
		},
		{
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
			loader: 'url',
			query: {
			    limit: 8192
			}
		},
		{
			test: require.resolve('zepto'),
			loader: 'exports?window.Zepto!script'
		}
	]
	},
	plugins: [
		// new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),
		new ExtractTextPlugin("[name].css"),
		new HtmlWebpackPlugin()
    ],
	resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },
	node: {
		fs: "empty" // avoids error messages
	}
};

module.exports = webpackMerge(config, {});
