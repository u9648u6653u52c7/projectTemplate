/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2016-08-04
 */


var path = require('path');

module.exports = {
  projectRoot: path.resolve(__dirname, '..'),

  /**
   *  Webpack 默认配置
   */

  entryFileDir: path.resolve(__dirname, '../src/pages'),
  entryKeyType: true,  // 入口对象的key值类型：true为path类型，false为文件名
  assetsRoot: path.resolve(__dirname, '../dist'),
  publicPath: '/',

  /**
   *  Webpack 开发配置
   */

  dev: {
    entryFileDir: path.resolve(__dirname, '../src'),  // 便于调试组件
    entryKeyType: true,
    assetsRoot: path.resolve(__dirname, '../dist'),
    publicPath: '/assets/',
    www: path.resolve(__dirname, '../src/'),
    port: '8080'
  },

  /**
   *  Webpack 生产配置
   */

  prod: {

  }

};
