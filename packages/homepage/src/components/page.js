
import React from "react";
import htm from "htm";
const html = htm.bind(React.createElement);

export const Page = ({ name, children }) => html `
  <div id="main">
    <div className="header">
      <h1>${name}</h1>
    </div>
    <div className="content">${children}</div>
  </div>
`;


