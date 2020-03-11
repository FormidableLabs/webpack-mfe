"use strict";

const config = require("../../webpack.config");

module.exports = config({
  app: "item",
  publicPath: "http://127.0.0.1:3002/",
  title: "Item",
  exposes: {
    "pages/index": "./src/pages/index"
  }
});
