/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-06
 */

process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const utils = require('../scripts/utils');
const baseConfig = require('./index');
const webpackBaseConfig = require('./webpack.base');
const chunkhash = utils.generateHashString('chunkhash', baseConfig.hashLength);


const config = {
	output: {
		path: baseConfig.prod.assetsRoot,
		publicPath: baseConfig.prod.assetsPublicPath,
		filename: 'js/[name].' + chunkhash + '.js',
		chunkFilename: 'js/[id].' + chunkhash + '.js'
	},
	module: {
		rules: [
      // css文件压缩

			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {minimize: true, sourceMap: true}
            }
          ]
        })
			},

      // less文件压缩

      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {minimize: true, sourceMap: true}
            },
            {
              loader:'less-loader',
              options: {sourceMap: true}
            }
          ]
        })
      },

      // 图片压缩

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
			},
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {minimize: true, sourceMap: true}
                }
              ]
            }),
            less: ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {minimize: true, sourceMap: true}
                },
                {
                  loader:'less-loader',
                  options: {sourceMap: true}
                }
              ]
            })
          }
        }
      }
		]
	},
	plugins: [

    // js文件压缩

		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
      sourceMap: true
		}),

    // 解决vendor不缓存的问题

    new ChunkManifestPlugin({
      filename: "js/manifest.json",
      manifestVariable: "webpackManifest"
    })

  ]
};

module.exports = webpackMerge.smart(webpackBaseConfig, config);
