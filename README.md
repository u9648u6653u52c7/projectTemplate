projectTemplate
========

projectTemplate即工程模板，创建之初衷是想利用Gulp、Webpack为开发人员提供一个开箱即用的开发环境。  

### 技术栈  
整个技术栈的搭建主要是针对多页面应用；单页面的应用可以选择相关框架或库提供的工具，如：vue-cli……

##### Gulp + Webpack + ES6 + Vue or Other

> __Gulp__：流式构建系统  
  __Webpack__：一个打包工具能很好的解析模块依赖并生成相关静态资源。与生俱来的支持CommonJs、AMD、ES6……，它视所有前端资源为模块；与此同时还具有一定的构建能力。  
  __ES6__：JS的未来   
  __Vue__：数据驱动的组件，为现代化的 Web 界面而生。 具有响应的数据绑定系统、组件系统……   
  __Other__：jQuery、Zepto、Handlerbas……

### 目录结构

> 
    projectTemplate/  
        ├── shell/    node脚本    
        │  
        ├── conf/     工程配置  
        │   
        ├── src/   开发目录
        │   ├── components/   组件
        │   ├── pages/        页面
        │   ├──   
        ├── dist/      自动生成
        │      
        ├── test/      测试
        │  
        ├── node_modules/     自动生成，包含node依赖以及开发依赖 
        │  
        ├── static/           库文件等，不会被webpack的loader处理,手动管理
        │     
        └── etc               
        
