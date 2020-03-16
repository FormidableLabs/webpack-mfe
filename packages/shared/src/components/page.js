import React from "react";
import { html } from "webpack-mfe-shared";

const Page = React.memo(({ name, children }) => html `
  <div id="main">
    <div className="header">
      <h1>${name}</h1>
    </div>
    <div className="content pure-g">
      ${children}
    </div>
  </div>
`);

export default Page;
