"use strict";

const config = require("../../webpack.config");

module.exports = config({
  app: "homepage",
  title: "Homepage",
  exposes: {
    "./pages/homepage": "./src/pages/homepage"
  }
});
