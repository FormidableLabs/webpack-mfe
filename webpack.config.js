"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    pathinfo: true,
    filename: "[name].js"
  },
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "TODO_TITLE",
      chunks: ["main"]
    })
  ]
};
