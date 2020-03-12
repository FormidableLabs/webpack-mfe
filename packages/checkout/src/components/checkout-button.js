import { Link } from "react-router-dom";
import { html } from "webpack-mfe-shared";

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
