/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-04
 */

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entryFileTypeREG = /\.jsx?$/;

/**
 * walkDir 文件夹遍历
 * @param {String} dir
 * @return {Array} fileList
 */

function walkDir(dir) {
	var fileList = [];
	(function walk(dir) {
		dir = path.resolve(__dirname, dir);
		try {
			fs.readdirSync(dir).forEach(function (value, index) {
				var realPath = path.resolve(dir, value),
					stat = fs.statSync(realPath);
				if (stat.isDirectory()) {
					walk(realPath);
				} else {
					fileList.push(realPath);
				}
			});
		} catch (err) {
			console.log(err.message)
		}
	})(dir);
	return fileList;
}

/**
 * getEntries 获取webpack的入口对象
 * @param {String} dir
 * @param {String} entryFileName
 * @returns {Object} dict
 */

function getEntries(dir, entryFileName='entry.js') {
	var dict = {}
		,entryREG = new RegExp(entryFileName)
		,files = walkDir(dir);

	var generateKey = (function (dir) {

		/**
		 * generatePathKey
		 * @param {String} filePath
		 * @returns {String}
		 */

		function generatePathKey(filePath) {
			var baseDir = path.resolve(__dirname, dir)
				,key = filePath.slice(baseDir.length + 1)
				,key = key.slice(0, key.lastIndexOf('.'));  // 去掉后缀名
			return key.indexOf('\\') != -1 ? key.replace(/\\/g, '/') : key;  // 优化斜杠为反斜杠
		}

		return generatePathKey;

	})(dir);

	files.forEach(function (value, index) {
		if ( entryFileTypeREG.test(value) && entryREG.test(value) ) {
			dict[generateKey(value)] = [value];
		}
	});

    return dict;
}

/**
 * createHtmlByHtmlWebpackPlugin
 * @param entries {object or Sting} webpackConfig.entry
 * @param options {Object}
 * {
 *   baseName: 'tpl.html',
 *   indexHtml: '',  // for spa app
 *   filters: [],    // 过滤chunk
 *   chunks: [],     // 手动添加公共模块：vendor,common~；该函数只添加了一个已知的入口点，
 *   config: {}
 * }
 * @returns {Array}
 */

function createHtmlByHtmlWebpackPlugin(entries, options) {
	var arr = [],
		options = _.merge({
      baseName: 'template.html',
      indexHtml: '',
      filters: [],
      chunks: [],
      config: {}
    }, options);

	if ( _.isPlainObject(entries) ) {
		for (var key in entries) {
			if (entries.hasOwnProperty(key) && (options.filters.indexOf(key) == -1) ) {
				var index = key.lastIndexOf('/');
				arr.push(new HtmlWebpackPlugin(_.merge({
					filename: (index != -1 ? key.slice(0, index) : key) + '.html',
					template: path.resolve(path.dirname(_.last(entries[key])), options.baseName),
					chunks: options.chunks.concat([key]),
					inject: true,
					chunksSortMode: 'auto'
				},options.config)));
			}
		}
	} else {
		arr.push(new HtmlWebpackPlugin({
			filename: 'index.html',
			template: options.indexHtml
		}));
	}

	return arr;
}


/**
 * generateHashString
 * @param hashType {String}
 * @param hashLength {Number}
 * @returns {string} [hash:hashLength] or [chunkhash:hashLength] or [contenthash:hashLength]
 */

function generateHashString(hashType, hashLength) {
	return !!hashLength ? (['[', hashType, ':', hashLength, ']']).join('')
		: (['[', hashType, ']']).join('');
}

module.exports = {
	walkDir: walkDir,
	getEntries: getEntries,
	createHtmlByHtmlWebpackPlugin: createHtmlByHtmlWebpackPlugin,
	generateHashString: generateHashString
};
