"use strict";

const config = require("../../webpack.config");

module.exports = config({
  app: "homepage",
  title: "Homepage",
  exposes: {
    "components/layout": "./src/components/layout",
    "components/page": "./src/components/page"
  }
});
