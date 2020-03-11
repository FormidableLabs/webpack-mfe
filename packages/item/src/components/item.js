import React from "react";
import { Link, useLocation } from "react-router-dom";

import htm from "htm";
const html = htm.bind(React.createElement);

// TODO: Abstract this (or a memo fn).
const _data = () => {
  _data.prom = _data.prom || import("app_homepage/data/index");
  return _data.prom;
};

const Loading = ({ id }) => html `
  <div style=${{ textAlign: "center" }} className="pure-u-1-3">
    <em style=${{ fontSize: "1.5em", lineHeight: "2em" }}>Loading item ${id}...</em>
  </div>
`;

export const Item = ({ id, name, emoji }) => {
  const idNum = parseInt(id, 10);
  const location = useLocation();
  const [item, setData] = React.useState({ id, name, emoji });

  React.useEffect(() => {
    // Skip if already have data for current element.
    if (item.name && item.id === idNum) {
      return;
    }

    _data()
      .then(({ fetchItem }) => fetchItem({ id }))
      .then((d) => setData(d))
      .catch(() => {});
  }, [item, location]);

  // Wait for data load.
  if (!item.name || item.id !== idNum) {
    return html `<${Loading} id=${id} />`;
  }

  return html `
    <${Link}
      to=${{
    pathname: `/item/${item.id}`,
    state: { item }
  }}
      style=${{
    color: "inherit",
    textDecoration: "none",
    textAlign: "center",
    backgroundColor: "#eeeeee"
  }}
      className="pure-u-1-3"
    >
      <p style=${{ fontSize: "10em" }}>${item.emoji}</p>
      <p style=${{ fontSize: "2em" }}>${item.name}</p>
    </${Link}>
  `;
};
