import React from "react";
import ReactDOM from "react-dom";

import htm from "htm";
const html = htm.bind(React.createElement);

const App = () => html `<h1>Search</h1>`;

ReactDOM.render(
  html `<${App} />`,
  document.getElementById("root")
);
