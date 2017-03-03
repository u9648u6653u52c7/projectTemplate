/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-06
 */

var _ = require('lodash');
var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var utils = require('../scripts/utils');
var baseConfig = require('./index');
var webpackBaseConfig = require('./webpack.base');
var entries = webpackBaseConfig.entry;
var chunkhash = utils.generateHashString('chunkhash', baseConfig.hashLength);

webpackBaseConfig.plugins = utils.createHtmlByHtmlWebpackPlugin(entries, {  // HtmlWebpackPlugin也有需要优化的地方
	baseName: baseConfig.htmlTemplateName,
	filters: ['vendor'],
	chunks: ['vendor', 'common']
});

var config = {
	output: {
		path: baseConfig.prod.assetsRoot,
		publicPath: baseConfig.prod.assetsPublicPath,
		filename: 'js/[name].' + chunkhash + '.js',
		chunkFilename: 'js/[id].' + chunkhash + '.js'
	},
	module: {
		rules: [
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
              context: baseConfig.entryFileDir,
              name: 'img/[path][name].' + utils.generateHashString('hash', baseConfig.hashLength) + '.[ext]'
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
        filename: 'css/[name].' + utils.generateHashString('contenthash', baseConfig.hashLength) + '.css',
        allChunks: true
      })
	],
	devtool: '#source-map'
};

module.exports = webpackMerge.smart(webpackBaseConfig, config);
