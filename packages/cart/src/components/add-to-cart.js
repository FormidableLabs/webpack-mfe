import React from "react";
import { Link } from "react-router-dom";

import htm from "htm";
const html = htm.bind(React.createElement);

const AddToCart = () => html `
  <${Link}
    to="/cart"
    className="pure-button"
    style=${{ color: "white", backgroundColor: "orange" }}
  >
    Add to cart
  </${Link}>
`;

export default AddToCart;
