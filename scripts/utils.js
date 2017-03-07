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
 *   htmlTemplateName: 'template.html',
 *   excludeChunks: [],               // 过滤入口点,并不是为所有的入口点都生成html文件
 *   publicChunks: [],               // 手动添加公共chunk：vendor,common等,这些入口点大多都是webpack手动指定的
 *   htmlWepackPluginConfig: {}     // html-webpack-plugin 的配置
 * }
 * @returns {Array}
 */

function createHtmlByHtmlWebpackPlugin(entries, options) {

	const arr = [];
	const	config = _.merge({
    htmlTemplateName: 'template.html',
    excludeChunks: [],
    publicChunks:  [],
    htmlWepackPluginConfig: {}}, options);

	if ( _.isPlainObject(entries) ) {

		for (let chunkName in entries) {

			if ( entries.hasOwnProperty(chunkName) &&
              (config.excludeChunks.indexOf(chunkName) == -1) ) {

				let fileName = chunkName.split('/')[0],
            templatePath = path.resolve(path.dirname(entries[chunkName][0]), config.htmlTemplateName);
				arr.push(new HtmlWebpackPlugin(_.merge({
					filename: fileName + '.html',
					template: templatePath,
					chunks: config.publicChunks.concat([chunkName]),
					inject: true,
					chunksSortMode: 'auto'
				},config.htmlWepackPluginConfig)));
      }
		}

	} else {

    let templatePath = null;

    if ( _.isArray(entries) ) {
      templatePath = path.resolve(path.dirname(entries[0]), config.htmlTemplateName);
    } else if (_.isString(entries)) {
      templatePath = path.resolve(path.dirname(entries), config.htmlTemplateName);
    }

		arr.push(new HtmlWebpackPlugin({
			filename: 'index.html',
			template: templatePath
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
