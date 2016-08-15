/**
 * http://webpack.github.io/docs/webpack-dev-server.html
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-06
 */

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var conf = require('../conf');
var webpackDevConfig = require('../conf/webpack.dev');

var server = new webpackDevServer(webpack(webpackDevConfig), {
	// webpack-dev-server options

	contentBase: conf.dev.www,
	publicPath: conf.publicPath,
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

server.listen(conf.dev.port, conf.dev.hostname, function (err) {
	if (err) return console.log(err);
	console.log('Listening at http://' + conf.dev.hostname + ':' + conf.dev.port + '\n');
});


