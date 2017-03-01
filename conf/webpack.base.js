/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-04
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var conf = require('./index');
var t = require('../shell/utils');
var hash = t.generateHashString('hash', conf.hashLength);

var config = {
	entry: t.getEntries(conf.entryFileDir, conf.entryFileName, conf.entryKeyType),
	output: {
		path: conf.assetsRoot,
		publicPath: conf.assetsPublicPath,
		filename: 'js/[name].js',
		chunkFilename: 'js/[id].chunk.js'
	},
	module: {
		noParse: [
			/lodash\.min\.js/,
			/vue\.min\.js/
		],
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				options: {
				  presets: ['react', 'es2015'],
				  plugins: ['transform-runtime'],
				  cacheDirectory: true
				},
				include: path.resolve(conf.projectRoot, 'src'),
				exclude: /node_modules|static/
			},
			{
				test: /\.hbs$/,
				loader: "handlebars-template-loader",
				options: {
					prependFilenameComment: conf.entryFileDir
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
				options: {
					attrs: ['img:src', 'img:data-src'],
					interpolate: 'require'
				}
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
          limit: 8192,
					context: conf.entryFileDir,
					name: 'img/[path][name].' + hash + '.[ext]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
          limit: 8192,
					context: conf.entryFileDir,
					name: 'fonts/[path][name].' + hash + '.[ext]'

				}
			},
			{
				test: require.resolve('zepto/dist/zepto.min'),
				loader: 'exports-loader?window.Zepto!script-loader'
			}
		]
	},
	resolve: {
		modules: [path.resolve(conf.projectRoot, 'node_modules')],
		alias: {
			vue: 'vue/dist/vue.min.js',
			zepto: 'zepto/dist/zepto.min.js',
			lodash: 'lodash/lodash.min.js',
			static: path.resolve(conf.projectRoot, 'static'),
			components: path.resolve(conf.projectRoot, 'src/components')
		},
    extensions: ['.js', '.jsx', '.json']
  }
};

config.entry['vendor'] = ['zepto', 'lodash'];   // 根据需要把vue加进vendor

module.exports = config;
