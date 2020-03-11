"use strict";

const config = require("../../webpack.config");

module.exports = config({
  app: "homepage",
  publicPath: "http://127.0.0.1:3001/",
  title: "Homepage",
  exposes: {
    "data/index": "./src/data/index",
    "components/layout": "./src/components/layout",
    "components/menu": "./src/components/menu",
    "components/page": "./src/components/page"
  }
});
