path = require 'path'
webpack = require 'webpack'
ExtractTextPlugin = require 'extract-text-webpack-plugin'
HtmlWebpackPlugin = require 'html-webpack-plugin'

appRoot = "#{__dirname}/src"
bowerRoot = "#{__dirname}/bower_components"
styleRoot = "#{appRoot}/assets/styles"

module.exports =
  cache: true
  debug: true

  entry: [
    path.join appRoot, '/app/index.js'
  ]

  output:
    path: './target'
    filename: 'bundle-[hash].js'
    chunkFilename: "[id].bundle-[hash].js"

  module:
    loaders: [
      test: /\.js$/
      exclude: /node_modules|bower_components/
      loaders: ['babel']
    ,
      # required to write 'require('./style.css')'
      test: /\.css$/
      loaders: ['style', 'css']
    ,
      # required to write 'require('./style.less')'
      test: /\.less$/
      loader: ExtractTextPlugin.extract('style', "css!less?includePaths[]=#{styleRoot}")
    ,
      # Write 'var templatesUrl = require('app/templates/template-name.html');'
      # on start of .js file.
      # Then use { ..., templateUrl: templateUrl, ... }
      test: /\.html$/
      loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, 'src/')) + '/!html'
    ,
      test: /\.(otf|eot|png|svg|ttf|woff|woff2)(\?.*)?$/
      loader: 'file?name=static/[path][name].[ext]?[hash]'
    ,
      # Write 'var imgSrc = require('assets/images/img.jpg');'
      test: /.(jpg|png)$/
      loader: 'file?name=static/[path][name].[ext]?[hash]'
    ]

    # don't parse some dependencies to speed up build.
    # can probably do this non-AMD/CommonJS deps
    noParse: [
      path.join bowerRoot, '/angular'
      path.join bowerRoot, '/angular-route'
      path.join bowerRoot, '/angular-ui-router'
      path.join bowerRoot, '/angular-mocks'
      path.join bowerRoot, '/jquery'
      path.join bowerRoot, '/lodash'
      path.join bowerRoot, '/restangular'
    ]

  resolve:
    alias:
      bower: bowerRoot

    extensions: [
      ''
      '.js'
      '.coffee'
      '.less'
      '.css'
    ]

    modulesDirectories: [
      appRoot
      bowerRoot
      styleRoot
    ]

    root: appRoot

  plugins: [

    # disable dynamic requires
    new webpack.ContextReplacementPlugin(/.*$/, /a^/)

    new webpack.ProvidePlugin
      'angular': 'exports?window.angular!bower/angular'

    new ExtractTextPlugin 'style-[hash].css'

    new HtmlWebpackPlugin
      template: 'src/index.html'
      inject: true
  ]

  devtool: 'eval'
