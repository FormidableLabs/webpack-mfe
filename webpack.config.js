"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// TODO: Integrate here or somehwere
// const URLS = {
//   homepage: "http://127.0.0.1:3001",
//   item: "http://127.0.0.1:3002",
//   search: "http://127.0.0.1:3003",
//   cart: "http://127.0.0.1:3004",
//   checkout: "http://127.0.0.1:3005",
// };

module.exports = ({ app, publicPath, title, exposes = {} }) => ({
  entry: "./src/index.js",
  cache: false,
  output: {
    path: path.resolve("dist"),
    pathinfo: true,
    publicPath,
    filename: "[name].js"
  },
  devtool: false,
  optimization: {
    minimize: false
  },
  plugins: [
    new ModuleFederationPlugin({
      name: `app_${app}`,
      library: { type: "var", name: `app_${app}` },
      filename: "remote-entry.js",
      remotes: {},
      exposes: {},
      // TODO HERE: http://127.0.0.1:3001/remote-entry.js is generated but nothing else works.
      //
      // TODO: USE
      remotes: {
        app_item: "app_item"
      },
      exposes,
      // TODO: USE
      shared: ["react", "react-dom", "react-router-dom"]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      title,
      chunks: ["main"]
    })
  ]
});
