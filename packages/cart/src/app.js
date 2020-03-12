import React from "react";
import ReactDOM from "react-dom";
import { html, Layout } from "webpack-mfe-shared";
import CartPage from "./pages/cart";

const App = (props) => html `
  <${React.Suspense} fallback=" ">
    <${Layout} ...${props} />
  </${React.Suspense}>
`;

ReactDOM.render(
  html `<${App} app="Cart" pages=${{ CartPage }} />`,
  document.getElementById("root")
);
