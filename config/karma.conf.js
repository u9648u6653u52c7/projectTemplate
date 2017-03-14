// Karma configuration
// Generated on Wed Aug 24 2016 15:05:50 GMT+0800 (中国标准时间)

var path = require('path');
var webpackMerge = require('webpack-merge');
var baseConfig= require('./index');
var webpackBaseConfig = require('./webpack.base');

delete webpackBaseConfig.entry;

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: baseConfig.projectRoot,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/*_test.js',
	    'test/**/*_test.js'
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/*_test.js': ['webpack', 'sourcemap'],
	    'test/**/*_test.js': ['webpack', 'sourcemap']
    },

    // you don't need to specify the entry option because
    // karma watches the test entry points
    // webpack watches dependencies

    webpack: webpackMerge.smart(webpackBaseConfig, {
      devtool: 'inline-source-map'
    }),

	  webpackMiddleware: {
      // webpack-dev-middleware configuration
		  noInfo: true,
      stats: {
        chunks: false,
        colors: true
      }
	  },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'kjhtml'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
