/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-06
 */

var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
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
				loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              context: conf.entryFileDir,
              name: 'img/[path][name].' + t.generateHashString('hash', conf.hashLength) + '.[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              progressive:true, 
              optimizationLevel: 7, 
              interlaced: false, 
              pngquant:{quality: "65-90", speed: 4}
            }
          }
        ]
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
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
		new ExtractTextPlugin({
        filename: 'css/[name].' + t.generateHashString('contenthash', conf.hashLength) + '.css',
        allChunks: true
      })
	],
	devtool: '#source-map'
};

module.exports = webpackMerge.smart(webpackBaseConfig, config);
