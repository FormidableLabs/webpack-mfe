import { Link } from "react-router-dom";
import { html } from "webpack-mfe-shared";

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
