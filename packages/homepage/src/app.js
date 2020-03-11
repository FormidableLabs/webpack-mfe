import React from "react";
import ReactDOM from "react-dom";
import htm from "htm";

import Layout from "./components/layout";
const html = htm.bind(React.createElement);

const App = (props) => html `<${Layout} ...${props} />`;

ReactDOM.render(
  html `<${App} app="Home" />`,
  document.getElementById("root")
);
