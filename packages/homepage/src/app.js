import ReactDOM from "react-dom";
import { html } from "webpack-mfe-shared";

import Layout from "./components/layout";

const App = (props) => html `<${Layout} ...${props} />`;

ReactDOM.render(
  html `<${App} app="Home" />`,
  document.getElementById("root")
);
