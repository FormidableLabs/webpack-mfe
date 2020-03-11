"use strict";

const config = require("../../webpack.config");

module.exports = config({
  app: "checkout",
  title: "Checkout",
  exposes: {
    "components/checkout-button": "./src/components/checkout-button",
    "pages/checkout": "./src/pages/checkout",
    "pages/thank-you": "./src/pages/thank-you"
  }
});
