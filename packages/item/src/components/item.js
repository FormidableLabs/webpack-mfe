import React from "react";
import { Link } from "react-router-dom";

import htm from "htm";
const html = htm.bind(React.createElement);

export const Item = ({ id, name, emoji }) => html `
    <${Link}
      to=${{
    pathname: `/item/${id}`,
    state: { item: { id, name, emoji } }
  }}
      style=${{
    color: "inherit",
    textDecoration: "none",
    textAlign: "center",
    backgroundColor: "#eeeeee"
  }}
      className="pure-u-1-3"
    >
      <p style=${{ fontSize: "10em" }}>${emoji}</p>
      <p style=${{ fontSize: "2em" }}>${name}</p>
    </${Link}>
  `;
