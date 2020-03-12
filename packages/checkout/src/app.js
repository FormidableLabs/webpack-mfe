import React from "react";
import ReactDOM from "react-dom";
import { html, Layout } from "webpack-mfe-shared";
import CheckoutPage from "./pages/checkout";
import ThankYouPage from "./pages/thank-you";

const App = (props) => html `
  <${React.Suspense} fallback=" ">
    <${Layout} ...${props} />
  </${React.Suspense}>
`;

ReactDOM.render(
  html `<${App} app="Checkout" pages=${{ CheckoutPage, ThankYouPage }} />`,
  document.getElementById("root")
);
