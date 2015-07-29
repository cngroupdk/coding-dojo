fullWebpackConfig = require './webpack.config.coffee'

webpackConfig =
  module: fullWebpackConfig.module
  resolve: fullWebpackConfig.resolve
  plugins: fullWebpackConfig.plugins
  devtool: 'eval'
  cache: true
  debug: true

webpackConfig.module.postLoaders = [
  {
    test: /\.js$/
    exclude: /(test|node_modules|bower_components)\//
    loader: 'istanbul-instrumenter'
  }
]

module.exports = (config) ->
  config.set
    basePath: ''

    files: [
      'test/specs/test-index.js'
      'test/specs/**/*.spec.js'
    ]

    exclude: [
    ]

    preprocessors: {
      'src/app/**/*.js': ['webpack', 'coverage']
      'test/specs/test-index.js': ['webpack']
      'test/specs/**/*.spec.js': ['webpack']
    }

    webpack: webpackConfig
    webpackMiddleware:
      noInfo: true

    coverageReporter:
      type: 'html',
      dir: 'test/coverage/'

    frameworks: ['jasmine']
    reporters: ['progress', 'coverage']
    browsers: ['PhantomJS']

    logLevel: config.LOG_INFO
    port: 9876
    colors: true
    autoWatch: true
    singleRun: true
