/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-06
 */

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('../conf');
var webpackDevConfig = require('../conf/webpack.dev');

var server = new webpackDevServer(webpack(webpackDevConfig), {
  // webpack-dev-server options
  contentBase: config.dev.contentBase,
  publicPath: "/assets/",
  hot: true

  // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server

  // webpack-dev-middleware options

});

server.listen(8080);


