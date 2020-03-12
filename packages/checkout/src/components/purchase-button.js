import React from "react";
import { Link } from "react-router-dom";

import htm from "htm";
const html = htm.bind(React.createElement);

const PurchaseButton = () => html `
  <${Link}
    to="/checkout/thank-you"
    className="pure-button pure-button-primary"
    style=${{ color: "white" }}
  >
    Purchase my cart
  </${Link}>
`;

export default PurchaseButton;
