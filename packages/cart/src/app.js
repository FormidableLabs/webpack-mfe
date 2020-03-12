import React from "react";
import ReactDOM from "react-dom";
import { html } from "webpack-mfe-shared";

const Layout = React.lazy(() => import("app_homepage/components/layout"));

const App = (props) => html `
  <${React.Suspense} fallback=" ">
    <${Layout} ...${props} />
  </${React.Suspense}>
`;

ReactDOM.render(
  html `<${App} app="Cart" />`,
  document.getElementById("root")
);
