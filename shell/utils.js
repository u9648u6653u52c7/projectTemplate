/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-04
 */

var fs = require('fs');
var path = require('path');


/**
 * walkDir 文件夹遍历
 * @param {String} dir
 * @return {Array} fileList
 */

function walkDir(dir) {
	var fileList = [];
	(function walk(dir) {
		dir = path.resolve(__dirname, dir);
		fs.readdirSync(dir).forEach(function (value, index) {
			var realPath = path.resolve(dir, value),
				stat = fs.statSync(realPath);
			if ( stat.isDirectory() ) {
				walk(realPath);
			} else {
				fileList.push(realPath);
			}
		});
	})(dir);
	return fileList;
}


var entryFileTypeREG = /\.jsx?$/;

/**
 * getEntries 获取webpack的入口对象
 * @param {String} dir
 * @param {Boolean} flag 控制入口对象key值的输出形式：
 * flag为真时key值以路径形式输出；
 * flag为假时key值以文件名形式输出，文件名重复时会以其所在文件夹的名称命名key值；
 * flag默认为假；
 * @returns {Object} dict
 */

function getEntries (dir, flag) {
	var dict = {}
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
				,key = filePath.slice(baseDir.length);
			return key.slice(0, key.lastIndexOf('.'));  // 去掉后缀名
		}

		return flag ? generatePathKey : generateUniqueKey;

	})(dir);

	files.forEach(function (value, index) {
		if ( entryFileTypeREG.test(value) ) {
			dict[generateKey(value, dict)] = [value];
		}
	});

    return dict;
}


module.exports = {
	walkDir: walkDir,
	getEntries: getEntries
};
