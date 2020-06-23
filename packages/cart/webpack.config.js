"use strict";

const config = require("../../webpack.config");

module.exports = config({
  app: "cart",
  title: "Cart",
  exposes: {
    "./components/add-to-cart": "./src/components/add-to-cart",
    "./pages/cart": "./src/pages/cart"
  }
});
