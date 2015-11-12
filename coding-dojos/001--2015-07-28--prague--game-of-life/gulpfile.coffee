# gulp plugins
gulp = require 'gulp'
changed = require 'gulp-changed'
eslint = require 'gulp-eslint'
gutil = require 'gulp-util'
karma = require('karma').server

# misc
spawn = require('child_process').spawn
argv = require('minimist')(process.argv.slice(2))

# webpack
webpack = require 'webpack'
ngAnnotatePlugin = require 'ng-annotate-webpack-plugin'
webpackConfig = require './webpack.config'

if argv.production  # --production option
  webpackConfig.plugins = webpackConfig.plugins.concat(
    new ngAnnotatePlugin()
    new webpack.optimize.UglifyJsPlugin()
  )
  webpackConfig.devtool = false
  webpackConfig.debug = false

paths =
  other: [
    'src/**'
    '!src/**/*.js'
    '!src/**/*.less'
  ]
  targetDir: './target/'

gulp.task 'webpack', (cb) ->
  webpack webpackConfig, (err, stats) ->
    if (err)
      throw new gutil.PluginError 'webpack', err
    gutil.log '[webpack]', stats.toString
      colors: true
    cb()

# gulp other, moves changed files from source to other
gulp.task 'other', ->
  gulp.src paths.other
  .pipe changed paths.targetDir
  .pipe gulp.dest paths.targetDir

# gulp clearTarget
# clears target directory
rimraf = require 'rimraf'
gulp.task 'clearTarget', ->
  rimraf.sync paths.targetDir, gutil.log

#gulp build
gulp.task 'build', [
  'clearTarget'
  'webpack'
  'other'
]

gulp.task 'lint', ->
  return gulp.src [
      'src/app/**/*.js',
      'test/specs/**/*.js'
    ]
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())

# gulp watch
gulp.task 'watch', ['clearTarget', 'other'], ->
  fs = require 'fs'
  path = require 'path'
  flo = require 'fb-flo'
  flo paths.targetDir,
    port: 8888
    host: '0.0.0.0'
    verbose: !false
    glob: [
      '**/*.js'
      '**/*.css'
      '**/*.html'
    ]
  , (filepath, callback) ->
    url = filepath
    reload = true # set as true as angular doesn't support hotswapping
    if (path.extname filepath) is '.html'
      url = '/'
    callback
      resourceURL: url
      contents: fs.readFileSync paths.targetDir + filepath
      reload: reload

  webpack webpackConfig
  .watch 100, (err, stats) ->
    if (err)
      throw new gutil.PluginError 'webpack', err
    gutil.log '[webpack]', stats.toString
      colors: true

  gulp.watch paths.other, ['other']

# gulp apimock

gulp.task 'mockapi', (done) ->
  server = require './mock-api-server/server'

# Tests

## `gulp tdd` - run all specs and watch

gulp.task 'tdd', (done) ->
  karma.start(
    configFile: __dirname + '/karma.conf.coffee'
    singleRun: false
  , done)

# gulp
gulp.task 'default', ['build']
