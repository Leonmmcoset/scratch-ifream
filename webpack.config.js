const { merge } = require('webpack-merge');
const flarumConfig = require('flarum-webpack-config');

module.exports = merge(flarumConfig(), {
  entry: {
    admin: './admin.js',
    forum: './forum.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { pragma: 'm' }]
            ],
            plugins: [
              ['@babel/plugin-transform-react-jsx', { pragma: 'm' }]
            ]
          }
        }
      },
      {
        test: /\.yml$/,
        use: ['json-loader', 'yaml-loader']
      }
    ]
  }
});  