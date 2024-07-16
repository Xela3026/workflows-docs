const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = function () {
    return {
      name: 'polyfill',
      configureWebpack() {
        return {
            plugins: [
                new NodePolyfillPlugin({onlyAliases: ['process'],}),
            ],
        };
      },
    };
  };