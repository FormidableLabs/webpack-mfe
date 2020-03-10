"use strict";

const config = require("../../webpack.config");

module.exports = config({
  app: "homepage",
  publicPath: "http://127.0.0.1:3001/",
  title: "Homepage"
});
