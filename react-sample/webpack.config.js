var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/dist');
var APP_DIR = path.resolve(__dirname, 'src/public');

var config = {
  entry: APP_DIR + '/index.html',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};

module.exports = config;