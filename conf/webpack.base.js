/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-04
 */

var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var conf = require('./index');
var t = require('../shell/utils');

var config = {
    entry: t.getEntries(conf.entryFileDir, conf.entryKeyType),
	output: {
		path: conf.assetsRoot,
		publicPath: '/',
		filename: 'js/[name].js',
		chunkFilename: 'js/[id].chunk.js'
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
				exclude: /node_modules|static/
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.hbs$/,
				loader: "handlebars-template",
				query: {
					prependFilenameComment: conf.entryFileDir
				}
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
				loader: ExtractTextPlugin.extract('style?modules', 'css')
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url',
				query: {
			        limit: 8192,
					context: conf.entryFileDir,
					name: 'img/[path][name].[hash:7].[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url',
				query: {
				    limit: 8192,
					context: conf.entryFileDir,
					name: 'fonts/[path][name].[hash:7].[ext]'

				}
			},
			{
				test: require.resolve('zepto'),
				loader: 'exports?window.Zepto!script'
			}
		]
	},
	resolve: {
		alias: {
			static: path.resolve(conf.projectRoot, 'static'),
			components: path.resolve(conf.projectRoot, 'src/components')
		},
        extensions: ['', '.js', '.jsx', '.json']
    }
};

module.exports = webpackMerge(config, {});
