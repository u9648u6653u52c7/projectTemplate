/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-06
 */

require('shelljs/global');

var ora = require('ora');
var webpack = require('webpack');
var baseConfig = require('../config');
var webpackProdConfig = require('../config/webpack.prod');

console.log(
	'  Tip:\n' +
	'  Built files are meant to be served over an HTTP server.\n' +
	'  Opening index.html over file:// won\'t work.\n'
);

var spinner = ora('building for production...');
spinner.start();

var assetsPath = baseConfig.assetsRoot;
rm('-rf', assetsPath);
mkdir('-p', assetsPath);

webpack(webpackProdConfig, function (err, stats) {
	spinner.stop();
	if (err) throw err;
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n');
});
