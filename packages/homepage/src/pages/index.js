import React from "react";
import Page from "../components/page";

import htm from "htm";
const html = htm.bind(React.createElement);

const Homepage = () => html `
  <${Page}
    name="Homepage"
  >
    <div>
      This is the homepage.
    </div>
  </${Page}>
`;

export default Homepage;
