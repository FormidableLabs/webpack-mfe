import ReactDOM from "react-dom";
import { html, Layout } from "webpack-mfe-shared";
import Homepage from "./pages/homepage";

const App = (props) => html `<${Layout} ...${props} />`;

// **Note**: For shared page components that _our_ application has, pass them
// directly for speed of inclusion.
ReactDOM.render(
  html `<${App} app="Home" pages=${{ Homepage }} />`,
  document.getElementById("root")
);
