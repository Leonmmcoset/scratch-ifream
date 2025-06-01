const { merge } = require('webpack-merge');
const flarumConfig = require('flarum-webpack-config');

module.exports = merge(flarumConfig(), {
  entry: {
    forum: './js/forum/index.js'
  }
});    