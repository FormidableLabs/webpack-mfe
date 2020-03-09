"use strict";

const path = require("path");

module.exports = {
  entry: "src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    pathinfo: true,
    filename: "bundle.js"
  },
  devtool: false
};
