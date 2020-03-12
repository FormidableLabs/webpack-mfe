import React from "react";
import ReactDOM from "react-dom";
import { html, Layout } from "webpack-mfe-shared";
import ItemsPage from "./pages/items";
import ItemPage from "./pages/item";

const App = (props) => html `
  <${React.Suspense} fallback=" ">
    <${Layout} ...${props} />
  </${React.Suspense}>
`;

ReactDOM.render(
  html `<${App} app="Item" pages=${{ ItemsPage, ItemPage }} />`,
  document.getElementById("root")
);
