const path = require('path');
const { makeExternals } = require('./build_help/makeExternals');

module.exports = {
  entry: path.resolve(__dirname, './lib/index.js'),
  externals: [makeExternals()],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }],
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    library: 'rpio',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
  },
  target: 'node'
};
