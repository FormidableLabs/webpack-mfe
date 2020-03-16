import React from "react";
import { Link, useLocation } from "react-router-dom";
import { html, fetchItem } from "webpack-mfe-shared";

// ----------------------------------------------------------------------------
// Shared components
// ----------------------------------------------------------------------------
const AddToCart = React.lazy(() => import(/* webpackPrefetch: true */ "app_cart/components/add-to-cart"));

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
// Keep position with same colored period.
const EMPTY = html `<span style=${{ color: "#eeeeee" }} >.</span>`;

const Item = ({ id, name, emoji }) => {
  const idNum = parseInt(id, 10);
  const location = useLocation();
  const [item, setItem] = React.useState({ id, name, emoji });

  React.useEffect(() => {
    // Skip if already have data for current element.
    if (item.name && item.id === idNum) {
      return;
    }

    fetchItem({ id })
      .then((d) => setItem(d))
      .catch(() => {});
  }, [item, location]);

  return html `
    <div
      className="pure-u-1-3"
      style=${{ textAlign: "center", backgroundColor: "#eeeeee", paddingBottom: "10px" }}
    >
      <${Link}
        to=${{ pathname: `/item/${item.id}`, state: { item } }}
        style=${{ color: "inherit", textDecoration: "none" }}
      >
        <p style=${{ fontSize: "10em" }}>${item.emoji || EMPTY}</p>
        <p style=${{ fontSize: "2em" }}>${item.name || EMPTY}</p>
      </${Link}>
      <${React.Suspense} fallback=${null}>
        <${AddToCart} />
      </${React.Suspense}>
    </div>
  `;
};

export default Item;
