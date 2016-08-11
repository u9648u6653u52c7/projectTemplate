/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-04
 */

var path = require('path');
var projectRoot = path.resolve(__dirname, '..'),
	projectName = projectRoot.slice(projectRoot.lastIndexOf(path.sep) + 1);


exports = module.exports = {
	projectRoot: projectRoot,
	projectName: projectName,
	entryFileDir: path.resolve(projectRoot, 'src/pages'),
	entryKeyType: true,  // 入口对象的key值类型：true为path类型，false为文件名
	assetsRoot: path.resolve(projectRoot, 'dist'),
	tplBaseName: 'index.html',
	
	dev: {
		hostname: 'localhost',
		www: path.resolve(projectRoot, 'src'),
		port: '8000'
	},

	prod: {

	}

};
