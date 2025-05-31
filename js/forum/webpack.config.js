const path = require('path');
const flarum = require('flarum-webpack-config');

module.exports = flarum({
    context: __dirname,
    entry: {
        forum: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../../dist'),
        filename: '[name].js'
    },
    resolve: {
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "path": require.resolve("path-browserify"),
            "zlib": require.resolve("browserify-zlib"),
            "util": require.resolve("util/"),
            "os": require.resolve("os-browserify/browser"),
            "http": require.resolve("stream-http"),
            "fs": false,
            "child_process": false,
            "querystring": false
        },
        alias: {
            'node:querystring': 'querystring'
        }
    }
});