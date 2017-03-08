/**
 * @author: Brave <u9648u6653u52c7@gmail.com>
 * @date: 2017-03-08
 * @description: 对打包后的代码进行预览
 */

const fs = require('fs');
const open = require('open');
const express = require('express');
const baseConfig = require('../config/index');

if (fs.existsSync(baseConfig.prod.assetsRoot)) {
  const app = express();
  const url = 'http://'+ baseConfig.prod.hostname + ':' + baseConfig.prod.port;

  app.use(express.static(baseConfig.prod.assetsRoot));
  app.listen(baseConfig.prod.port, baseConfig.prod.hostname, function (err) {
    if (err) return console.log(err);
    open(url);
    console.log('提示:\n' +
      '预览服务器已启动,访问地址:' + url);
  });
} else {
  console.log(
    '提示:\n' +
    '访问的静态资源目录不存在,请确保build后使用该命令!!!\n');
}
