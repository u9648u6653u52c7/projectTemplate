/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-04
 */

const path = require('path');
const utils = require('../scripts/utils');
const baseConfig = require('./index');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const entryFiles = utils.getEntries(baseConfig.entryFileDir, baseConfig.entryFileName);

const config = {

	entry: Object.assign(entryFiles, {
    vendor: ['zepto', 'lodash', 'vue']
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
		noParse: /(?:node_modules|bower_components)(\\|\/)(lodash|jquery|vue[\/\\])/,

		rules: [
      {
				test: /\.es$/,
				loader: 'babel-loader',
				options: {
				  presets: ['env'],
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
          minimize: process.env.NODE_ENV !== 'production' ? false : true
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
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
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
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: ['css-loader']
            }),
            less: ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: ['css-loader', 'less-loader']
            })
          }
        }
      },

      // 有些第三方库不支持模块化, 通过使用script-loader和exports-loaderd导出模块供webpack使用

			{
				test: require.resolve('zepto/dist/zepto.min'),
				use: ['exports-loader?Zepto','script-loader']
			}
		]
	},

  plugins: []

};

// eslint-loader 只在开发过程中使用

process.env.NODE_ENV !== 'production' &&  config.module.rules.push({
  enforce: 'pre',
  test: /\.(jsx?|es)$/,
  loader: "eslint-loader",
  options: {
    formatter: require('eslint-friendly-formatter')
  },
  exclude: /node_modules|bower_components/
});

// html页面生成

config.plugins = (config.plugins || []).concat(utils.createHtmlByHtmlWebpackPlugin(config.entry, {
  htmlTemplateName: baseConfig.htmlTemplateName,
  excludeChunks: ['vendor', 'common'],
  publicChunks:  ['vendor', 'common'],
  htmlWepackPluginConfig: {
    chunksSortMode: function(prevChunk, nextChunk) {
      const orders = ['vendor', 'common', baseConfig.entryFileName.split('.')[0]];
      const order1 = orders.indexOf(prevChunk.names[0].split('/').pop());
      const order2 = orders.indexOf(nextChunk.names[0].split('/').pop());
      if (order1 > order2)
        return 1;
      else if (order1 < order2)
        return -1;
      else
        return 0;
    },
    minify: process.env.NODE_ENV === 'production' ? {
      minifyCSS: true,
      collapseWhitespace: true,
      removeComments: true,
      removeScriptTypeAttributes: true
    } : false
  }
}));

// css文件提取

config.plugins = (config.plugins || []).concat([
  new ExtractTextPlugin({
    filename: process.env.NODE_ENV !== 'production' ? 'css/[name].css'
      : ('css/[name].' + utils.generateHashString('contenthash', baseConfig.hashLength) + '.css'),
    allChunks: true
  })
]);

// 公共模块的提取

const chunkhash = utils.generateHashString('chunkhash', baseConfig.hashLength);

config.plugins = (config.plugins || []).concat([
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: process.env.NODE_ENV !== 'production' ? 'js/vendor.js' : ('js/vendor.' + chunkhash + '.js'),
    minChunks: Infinity,
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: process.env.NODE_ENV !== 'production' ? 'js/common.js' : ('js/common.' + chunkhash + '.js'),
    minChunks: 2,
    chunks: Object.keys(config.entry).filter(function (value) {
      return !(/vendor/.test(value));
    })
  })
]);

// devtool

config.devtool = process.env.NODE_ENV !== 'production' ? '#eval-source-map' : '#source-map';

module.exports = config;
