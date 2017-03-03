/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-04
 */

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var baseConfig = require('./index');
var utils = require('../scripts/utils');
var hash = utils.generateHashString('hash', baseConfig.hashLength);

var config = {
	entry: utils.getEntries(baseConfig.entryFileDir, baseConfig.entryFileName),
	output: {
		path: baseConfig.assetsRoot,
		publicPath: baseConfig.assetsPublicPath,
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
				include: path.resolve(baseConfig.projectRoot, 'src'),
				exclude: /node_modules|static/
			},

			{
				test: /\.hbs$/,
				loader: "handlebars-template-loader",
				options: {
					prependFilenameComment: baseConfig.entryFileDir
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
					context: baseConfig.entryFileDir,
					name: 'img/[path][name].' + hash + '.[ext]'
				}
			},

			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
          limit: 8192,
					context: baseConfig.entryFileDir,
					name: 'fonts/[path][name].' + hash + '.[ext]'
        }
			},

      // 有些第三方库不支持模块化, 通过使用script-loader和exports-loaderd导出模块供webpack使用

			{
				test: require.resolve('zepto/dist/zepto.min'),
				use: ['exports-loader?Zepto','script-loader']
			}
		]
	},

	resolve: {
		modules: [path.resolve(baseConfig.projectRoot, 'node_modules')],
		alias: {
			vue: 'vue/dist/vue.min.js',
			zepto: 'zepto/dist/zepto.min.js',
			lodash: 'lodash/lodash.min.js',
			static: path.resolve(baseConfig.projectRoot, 'static/'),
			components: path.resolve(baseConfig.projectRoot, 'src/components/')
		},
    extensions: ['.js', '.jsx', '.json']
  }

};

config.entry['vendor'] = ['zepto', 'lodash'];   // 根据需要把vue加进vendor

module.exports = config;
