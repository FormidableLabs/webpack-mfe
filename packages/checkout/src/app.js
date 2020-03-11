import React from "react";
import ReactDOM from "react-dom";
import htm from "htm";

const Layout = React.lazy(() => import("app_homepage/components/layout"));
const html = htm.bind(React.createElement);

const App = (props) => html `
  <${React.Suspense} fallback=" ">
    <${Layout} ...${props} />
  </${React.Suspense}>
`;

ReactDOM.render(
  html `<${App} app="Checkout" />`,
  document.getElementById("root")
);
