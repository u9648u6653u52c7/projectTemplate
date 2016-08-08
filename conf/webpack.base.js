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
	publicPath: conf.publicPath,
	filename: '[name].js',
	chunkFilename: '[id].chunk.js'
  },
  module: {
	preLoaders: [
	  {
		test: /\.jsx?$/,
		loader: "eslint",
		exclude: /node_modules|static/
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
		include: path.resolve(conf.projectRoot, 'src'),
		exclude: /node_modules|static/
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
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  eslint: {
	configFile: path.resolve(conf.projectRoot, '.eslintrc.js'),
	formatter: require("eslint-friendly-formatter")
  },
  node: {
	fs: "empty" // avoids error messages
  }
};

module.exports = webpackMerge(config, {});
