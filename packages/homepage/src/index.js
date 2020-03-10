import * as React from "react";
import * as ReactDOM from "react-dom";
import htm from "htm";

import { Layout } from "./components/layout";
const html = htm.bind(React.createElement);

const App = () => html `<${Layout} />`;

ReactDOM.render(
  html `<${App} />`,
  document.getElementById("root")
);
