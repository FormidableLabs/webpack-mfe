import React from "react";
import ReactDOM from "react-dom";
import { html, Layout } from "webpack-mfe-shared";

const App = (props) => html `
  <${React.Suspense} fallback=" ">
    <${Layout} ...${props} />
  </${React.Suspense}>
`;

ReactDOM.render(
  html `<${App} app="Item" />`,
  document.getElementById("root")
);
