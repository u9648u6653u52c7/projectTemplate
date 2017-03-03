/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-04
 */

var path = require('path');
var projectRoot = path.resolve(__dirname, '..'),
	  projectName = projectRoot.slice(projectRoot.lastIndexOf(path.sep) + 1);

module.exports = {
  projectRoot: projectRoot,
  projectName: projectName,
  entryFileDir: path.resolve(projectRoot, 'src/pages/'),
  entryFileName: 'page.js',
  assetsRoot: path.resolve(projectRoot, 'dist/'),
  assetsPublicPath: '/',
  hashLength: 8,
  htmlTemplateName: 'template.html',

	dev: {
		hostname: 'localhost',
		www: path.resolve(projectRoot, 'src'),
		port: '8080'
	},

	prod: {
		assetsRoot: path.resolve(projectRoot, 'dist'),
		assetsPublicPath: '/'
	}

};

