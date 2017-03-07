/**
 * 参考: http://webpack.github.io/docs/webpack-dev-server.html
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-06
 */

const _ = require('lodash');
const baseConfig = require('../config');
const webpackDevConfig = require('../config/webpack.dev');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const compiler = webpack(webpackDevConfig);
const webpackDevServerOptions = {

  // inline: true, 页面自动刷新工作模式,但node api 不支持

  // 客户端日志级别, 客户端是指浏览器控制台

  clientLogLevel: 'none',

  // 是否开启gzip压缩

  compress: false,

  // 从哪个目录提供bundle，并且此选项优先

  publicPath: baseConfig.dev.publicPath,

  // 告诉服务器从哪个目录提供内容

  contentBase: baseConfig.dev.contentBase,

  // 单页面应用可能用到,与路由相关

  historyApiFallback: {
    disableDotRule: true
  },

  // 是否开启模块热替换

  hot: baseConfig.dev.hot || true,

  // 可使用https协议,默认使用http,具体配置参考官网

  https: false,

  // 代理设置, 具体配置参考http-proxy-middleware

  // proxy: {},

  /**
   * Here you can access the Express app object and add your own custom middleware to it.
   * For example, to define custom handlers for some paths:
   * =======================================================
   * setup(app) {
   *   app.get('/some/path', function(req, res) {
   *     res.json({ custom: 'response' });
   *   });
   * }
   * =======================================================
   * 可以通过这种方式来参与Express应用的处理
   */

  //setup: false,

  /**
   * It is possible to configure advanced options for serving static files from contentBase.
   * See the Express documentation for the possible options.
   */

  // staticOptions: false,

  // 告诉服务器监视那些通过 devServer.contentBase 选项提供的文件。文件改动将触发整个页面重新加载。

  watchContentBase: true,

  // 监视文件相关的控制选项

  // watchOptions: {},

  // 控制台打包信息

  stats: {
    chunks: false,
    colors: true,
  }

};

const devProxy = baseConfig.dev.proxy;
const devSetup = baseConfig.dev.setup;
const devStaticOptions = baseConfig.dev.staticOptions;

if (devProxy && _.isPlainObject(devProxy)) {
  if (_.isPlainObject(webpackDevServerOptions.proxy))
    _.merge(webpackDevServerOptions.proxy, devProxy);
  else
    webpackDevServerOptions.proxy = devProxy;
}

devSetup && _.isFunction(devSetup) && (webpackDevServerOptions.setup = devSetup);

devStaticOptions && _.isPlainObject(devStaticOptions) && (webpackDevServerOptions.setup = devSetup);


const server = new webpackDevServer(compiler, webpackDevServerOptions);

server.listen(baseConfig.dev.port, baseConfig.dev.hostname, function (err) {
	if (err) return console.log(err);
	console.log('Listening at http://' + baseConfig.dev.hostname + ':' + baseConfig.dev.port + '\n');
});


