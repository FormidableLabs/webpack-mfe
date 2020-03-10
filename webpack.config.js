"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ title }) => ({
  entry: "src/index.js",
  output: {
    path: path.resolve("dist"),
    pathinfo: true,
    filename: "[name].js"
  },
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      title,
      chunks: []
    })
  ]
});
