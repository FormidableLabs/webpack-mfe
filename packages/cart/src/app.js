import ReactDOM from "react-dom";
import { html, Layout } from "webpack-mfe-shared";
import CartPage from "./pages/cart";

const App = (props) => html `<${Layout} ...${props} />`;

ReactDOM.render(
  html `<${App} app="Cart" pages=${{ CartPage }} />`,
  document.getElementById("root")
);
