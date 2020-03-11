"use strict";

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// Application constants to share across all builds.
const APPS = {
  homepage: "http://127.0.0.1:3001",
  item: "http://127.0.0.1:3002"
  // TODO: Other apps
  // search: "http://127.0.0.1:3003",
  // cart: "http://127.0.0.1:3004",
  // checkout: "http://127.0.0.1:3005",
};

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
    // - **Naming**: The `name` property will become a `var` so needs to be JS-compliant.
    new ModuleFederationPlugin({
      name: `app_${app}`,
      library: { type: "var", name: `app_${app}` },
      filename: `${app}-remote.js`,
      // Form: `{ app_homepage: "app_homepage" }`
      remotes: Object.fromEntries(Object.keys(APPS).map((name) => [`app_${name}`, `app_${name}`])),
      exposes,
      shared: ["react", "react-dom", "react-router-dom"]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      title,
      chunks: ["main"],
      // eslint-disable-next-line max-params
      templateParameters: (compilation, assets, assetTags, options) => ({
        compilation,
        webpackConfig: compilation.options,
        htmlWebpackPlugin: { tags: assetTags, files: assets, options },
        // Inject remotes in <script> tags before main JS. E.g.
        // `<script src="http://127.0.0.1:3001/homepage-remote.js"></script>`
        remotes: Object.entries(APPS).map(([name, base]) => `${base}/${name}-remote.js`)
      })
    })
  ]
});
