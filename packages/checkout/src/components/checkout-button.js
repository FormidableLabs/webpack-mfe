import React from "react";
import { Link } from "react-router-dom";

import htm from "htm";
const html = htm.bind(React.createElement);

const CheckoutButton = () => html `
  <${Link}
    to="/checkout"
    className="pure-button pure-button-primary"
    style=${{ color: "white" }}
  >
    Checkout
  </${Link}>
`;

export default CheckoutButton;
