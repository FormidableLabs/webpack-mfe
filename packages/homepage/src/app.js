import ReactDOM from "react-dom";
import { html, Layout } from "webpack-mfe-shared";

const App = (props) => html `<${Layout} ...${props} />`;

ReactDOM.render(
  html `<${App} app="Home" />`,
  document.getElementById("root")
);
