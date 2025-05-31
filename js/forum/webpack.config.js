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
    }
});    