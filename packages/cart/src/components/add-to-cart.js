import { Link } from "react-router-dom";
import { html } from "webpack-mfe-shared";

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
