import React from "react";
import { Link, useLocation } from "react-router-dom";
import { html } from "webpack-mfe-shared";

// TODO: Abstract this (or a memo fn).
const _data = () => {
  _data.prom = _data.prom || import("app_homepage/data/index");
  return _data.prom;
};
// ----------------------------------------------------------------------------
// Shared components
// ----------------------------------------------------------------------------
const AddToCart = React.lazy(() => import("app_cart/components/add-to-cart"));

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
const Loading = ({ id }) => html `
  <div style=${{ textAlign: "center" }} className="pure-u-1-3">
    <em style=${{ fontSize: "1.5em", lineHeight: "2em" }}>Loading item ${id}...</em>
  </div>
`;

const Item = ({ id, name, emoji }) => {
  const idNum = parseInt(id, 10);
  const location = useLocation();
  const [item, setItem] = React.useState({ id, name, emoji });

  React.useEffect(() => {
    // Skip if already have data for current element.
    if (item.name && item.id === idNum) {
      return;
    }

    _data()
      .then(({ fetchItem }) => fetchItem({ id }))
      .then((d) => setItem(d))
      .catch(() => {});
  }, [item, location]);

  // Wait for data load.
  if (!item.name || item.id !== idNum) {
    return html `<${Loading} id=${id} />`;
  }

  return html `
    <div
      className="pure-u-1-3"
      style=${{ textAlign: "center", backgroundColor: "#eeeeee", paddingBottom: "10px" }}
    >
      <${Link}
        to=${{ pathname: `/item/${item.id}`, state: { item } }}
        style=${{ color: "inherit", textDecoration: "none" }}
      >
        <p style=${{ fontSize: "10em" }}>${item.emoji}</p>
        <p style=${{ fontSize: "2em" }}>${item.name}</p>
      </${Link}>
      <${AddToCart} />
    </div>
  `;
};

export default Item;
