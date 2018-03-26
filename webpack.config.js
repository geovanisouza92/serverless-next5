const slsw = require("serverless-webpack");

module.exports = {
  entry: function() {
    return slsw.lib.entries;
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
};
