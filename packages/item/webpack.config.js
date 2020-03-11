"use strict";

const config = require("../../webpack.config");

module.exports = config({
  app: "item",
  title: "Item",
  exposes: {
    "components/item": "./src/components/item",
    "pages/items": "./src/pages/items",
    "pages/item": "./src/pages/item"
  }
});
