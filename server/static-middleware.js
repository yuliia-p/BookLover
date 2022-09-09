const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, 'public');

const staticMiddleware = module.exports = [
  express.static(publicPath)
];

if (process.env.NODE_ENV === 'development') {
  staticMiddleware.unshift(...devMiddleware());
}

function devMiddleware() {
  const livereload = require('livereload').createServer();
  livereload.server.once('connection', () => {
    setTimeout(() => livereload.sendAllClients(JSON.stringify({
      command: 'reload',
      path: '/'
    })), 100);
  });
  livereload.watch(publicPath);
  const webpack = require('webpack')(require('../webpack.config'));
  return [
    require('connect-livereload')(),
    require('webpack-dev-middleware')(webpack),
    require('webpack-hot-middleware')(webpack)
  ];
}
