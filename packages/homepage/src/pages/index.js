import React from "react";
import Page from "../components/page";

import htm from "htm";
const html = htm.bind(React.createElement);

const Homepage = () => html `
  <${Page} name="Homepage">
    <div style=${{ textAlign: "center" }} className="pure-u-1-1">
      <p style=${{ fontSize: "1.5em", lineHeight: "2em" }}>
        Welcome to the emoji store!
      </p>
    </div>
  </${Page}>
`;

export default Homepage;
