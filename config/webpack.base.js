/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-04
 */

const path = require('path');
const utils = require('../scripts/utils');
const baseConfig = require('./index');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const entryFiles = utils.getEntries(baseConfig.entryFileDir, baseConfig.entryFileName);

const config = {

	entry: Object.assign(entryFiles, {
    vendor: ['zepto', 'lodash']
  }),

	output: {
		path: baseConfig.assetsRoot,
		publicPath: baseConfig.assetsPublicPath,
		filename: 'js/[name].js',
		chunkFilename: 'js/[id].chunk.js'
	},

  resolve: {
    alias: {
      vue: 'vue/dist/vue.min.js',
      zepto: 'zepto/dist/zepto.min.js',
      lodash: 'lodash/lodash.min.js',
      components: path.resolve(baseConfig.projectRoot, 'src/components/')
    },
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.resolve(baseConfig.projectRoot, 'node_modules')]
  },

  module: {
		noParse: [/vue/, /lodash/],

		rules: [
      {
				test: /\.jsx$/,
				loader: 'babel-loader',
				options: {
				  presets: ['es2015'],
				  plugins: ['transform-runtime'],
				  cacheDirectory: true
				},
				exclude: /node_modules|bower_components/
			},

			{
				test: /\.hbs$/,
				loader: "handlebars-template-loader",
				options: {
					prependFilenameComment: baseConfig.entryFileDir
				}
			},

			{
				test: /\.html$/,
				loader: 'html-loader',
				options: {
					attrs: ['img:src', 'img:data-src'],
					interpolate: 'require',
          minimize: true
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
					name: 'imgs/[path][name].[ext]'
				}
			},

			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
          limit: 8192,
					context: baseConfig.entryFileDir,
					name: 'fonts/[path][name].[ext]'
        }
			},

      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      // 有些第三方库不支持模块化, 通过使用script-loader和exports-loaderd导出模块供webpack使用

			{
				test: require.resolve('zepto/dist/zepto.min'),
				use: ['exports-loader?Zepto','script-loader']
			}
		]
	}

};

module.exports = config;
