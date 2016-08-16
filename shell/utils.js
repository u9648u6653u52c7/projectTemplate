/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-04
 */

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var HtmlWebpackPlugin = require('html-webpack-plugin');

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

var entryFileTypeREG = /\.jsx?$/;

/**
 * getEntries 获取webpack的入口对象
 * @param {String} dir
 * @param {String} entryFileName
 * @param {Boolean} flag 控制入口对象key值的输出形式：
 * flag为真时key值以路径形式输出；
 * flag为假时key值以文件名形式输出，文件名重复时会以其所在文件夹的名称命名key值；
 * flag默认为假；
 * @returns {Object} dict
 */

function getEntries (dir, entryFileName, flag) {
	var dict = {}
		,entryREG = new RegExp(entryFileName || 'entry.js')
		,flag = flag || false
		,files = walkDir(dir);

	var generateKey = (function (dir) {

		/**
		 * generateUniqueKey 生成入口对象的唯一key值
		 * @param {String} filePath
		 * @param {Object} dict
		 * @returns {String}
		 */

		function generateUniqueKey(filePath, dict) {
			var arr = filePath.split(path.sep)
				,i = arr.length
				,key = null;
			for (i-=1; 0 <= i; i--) {
				key = entryFileTypeREG.test(arr[i]) ? arr[i].slice(0, arr[i].lastIndexOf('.')) : arr[i];
				if ( !dict.hasOwnProperty(key) ) {
					return key;
				}
			}
		}

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

		return flag ? generatePathKey : generateUniqueKey;

	})(dir);

	files.forEach(function (value, index) {
		if ( entryFileTypeREG.test(value) && entryREG.test(value) ) {
			dict[generateKey(value, dict)] = [value];
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
			    baseName: 'tpl.html',
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
 * @returns {string} [hash:hashLenght] or [chunkhash:hashLength] or [contenthash:length]
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
