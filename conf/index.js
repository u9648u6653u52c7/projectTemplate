/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-04
 */

var path = require('path');
var projectRoot = path.resolve(__dirname, '..');

module.exports = {
	projectRoot: projectRoot,

	/**
	*  Webpack 默认配置
	*/

	entryFileDir: path.resolve(projectRoot, 'src/pages'),
	entryKeyType: true,  // 入口对象的key值类型：true为path类型，false为文件名
	assetsRoot: path.resolve(projectRoot, 'dist'),
	publicPath: '/assets/',

	/**
	*  Webpack 开发配置
	*/

	dev: {
		hostname: 'localhost',
		www: path.resolve(projectRoot, 'dist'),
		port: '8000'
	},

	/**
	*  Webpack 生产配置
	*/

	prod: {

	}

};
