/**
 * http://webpack.github.io/docs/webpack-dev-server.html
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-06
 */

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var baseConfig = require('../config');
var webpackDevConfig = require('../config/webpack.dev');

var server = new webpackDevServer(webpack(webpackDevConfig), {
	// webpack-dev-server options

	contentBase: baseConfig.dev.www,
	publicPath: baseConfig.publicPath,
	hot: true,
	historyApiFallback: false,
	compress: true,
	// proxy: {},  // 服务器代理功能根据需求自行配置

	// pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server

	// staticOptions: {},

	// webpack-dev-middleware options

	noInfo: false,
	stats: {
		colors: true,
		chunks: false
	}

});

server.listen(baseConfig.dev.port, baseConfig.dev.hostname, function (err) {
	if (err) return console.log(err);
	console.log('Listening at http://' + baseConfig.dev.hostname + ':' + baseConfig.dev.port + '\n');
});


