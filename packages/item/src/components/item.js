import React from "react";

import htm from "htm";
const html = htm.bind(React.createElement);

export const Item = ({ name, emoji }) => html `
  <div style=${{ textAlign: "center", backgroundColor: "#eeeeee" }} className="pure-u-1-3">
    <p style=${{ fontSize: "10em" }}>${emoji}</p>
    <p style=${{ fontSize: "2em" }}>${name}</p>
  </div>
`;
