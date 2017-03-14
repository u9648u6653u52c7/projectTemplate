projectTemplate
========

projectTemplate即工程模板，创建之初衷是想利用Gulp、Webpack为开发人员提供一个开箱即用的开发环境。

### 技术栈
整个技术栈的搭建主要是针对多页面应用；单页面的应用可以选择相关框架或库提供的脚手架工具，如：vue-cli……;
单页应用其实就是比多页面应用承载了更多的业务，在前端的架构上更加复杂,需要有路由、状态管理等支持,如果愿意~~~~,该项目可以修改成一个单页面的应用;单页面和多页面其实都无所谓啦。。。。


##### Gulp + Webpack + ES6 + Vue or Other

> __Gulp__：流式构建系统
  __Webpack__：一个打包工具能很好的解析模块依赖并生成相关静态资源。与生俱来的支持CommonJs、AMD、ES6……，它视所有前端资源为模块；与此同时还具有一定的构建能力。
  __ES6__：JS的未来
  __Vue__：数据驱动的组件，为现代化的 Web 界面而生。 具有响应的数据绑定系统、组件系统……
  __Other__：jQuery、Zepto、Handlerbas……

### 目录结构

>
    projectTemplate/
        ├── scripts/    node脚本
        │  ├──
        │  ├── dev-server.js  本地开发服务器
        │  ├── preview-server.js  打包后预览服务器
        │  ├── build.js  打包脚本
        │  ├── utils.js  工具函数
        │  ├──
        ├── config/     工程配置
        │  ├──
        │  ├── index.js  基础配置文件，在此可简单的修改webpack相关配置
        │  ├── webpack.base.js  webpack的基础配置，主要是loader、resolve、extract-text-webpack-plugin、CommonsChunkPlugin、devtool的配置
        │  ├── webpack.dev.js   webpack开发配置，主要是livereload、HMR及相关的插件
        │  ├── webpack.prod.js  webpack生产配置，主要是代码的压缩混淆，图片压缩，加hash
        │  ├── karma.conf.js  测试配置
        │  ├──
        ├── src/   开发目录
        │   ├── components/   组件
        │   ├── pages/        页面（页面下的项目目录需要遵循一定的规范以便创建webpack的入口文件，不过这些规范是可以调整的；以下只是推荐）
        │         ├── index/   首页
        │              ├── images/  图片资源
        │              ├── page.css 样式文件，文件名称可以按照自己意愿命名
        │              ├── page.js  脚本文件及webpack的入口文件，文件名称可以在/config/index.js配置
        │              ├── template.html 模板文件及要撰写的html文件，文件名称可以在/config/index.js配置
        │              ├──
        │
        ├── dist/  代码产出目录
        │
        ├── test/  测试（目录可以意愿来创建，但是测试文件名称必须遵循*_test.js的命名规范，可在/config/karma.conf.js修改配置）
        │
        ├── node_modules/     自动生成，包含node依赖以及开发依赖
        │
        │
        └── etc


### [femock](https://github.com/yewumian/femock) 前端冒烟数据
原想搭建一个mock服务器供前端本地开发使用；然而朋友开发了一个mock数据平台且简单实用，正好可以在此使用。

### 开发体验
> 1. 舒适的编码 （相关资源就近管理）
2. 模块化 （webpack）
3. 组件化 （每个人对组件的定义不同，按照自己的意愿来吧；或者使用第三方带有组件系统的库或框架：Vue、React……）
4. 资源嵌入 （webpack）
5. 按需加载 (webpack)
6. 资源优化 （webpack）
7. 测试

### 使用方式
projectTemplate现提供3条命令进行日常开发，命令需在工程目录下运行。
> 1. npm run dev   （本地开发）
2. npm run build   （代码打包）
3. npm run test    （代码测试）
4. npm run preview  (代码打包后预览)

### 备注
因该项目还未成熟且在不断的优化过程中，在使用过程中可能会出现一定的问题。如果要使用的话可根据需要进行阉割或优化。
不得不说webpack的能力实在是太强悍了，但是入门容易出门难，要想发挥其更大的威力还是需要的不断学习。

##### 优化中……
