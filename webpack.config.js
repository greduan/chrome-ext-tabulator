const path = require('path');

module.exports = {
  entry: {
    options: [path.join(__dirname, 'src', 'options', 'options.js')],
    popup: [path.join(__dirname, 'src', 'popup', 'popup.js')],
    background: [path.join(__dirname, 'src', 'tabulator', 'tabulator.js')],
    'background-ui': [
      path.join(__dirname, 'src', 'tabulator', 'tabulator-ui.js'),
    ],
  },
  output: {
    path: path.join(__dirname, 'dist', 'webpack'),
    filename: '[name].js',
  },
  // XXX: May have to change for publishing.
  mode: 'development',
  devtool: 'source-map',
};
