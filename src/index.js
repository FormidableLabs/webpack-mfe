import * as React from "react";
import * as ReactDOM from "react-dom";

import htm from "htm";
const html = htm.bind(React.createElement);

const App = () => html `<h1>Hello, world!</h1>`;

ReactDOM.render(
  html `<${App} />`,
  document.getElementById("root")
);
