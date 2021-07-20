import React from "react";
import { Link, useLocation } from "react-router-dom";
import { html, fetchItem, eagerImport } from "webpack-mfe-shared";

// ----------------------------------------------------------------------------
// Shared components
// ----------------------------------------------------------------------------
// eslint-disable-next-line import/no-unresolved
const AddToCart = React.lazy(eagerImport(() => import("app_cart/components/add-to-cart")));

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
    // Skip on bad fetch
    if (item === false) { return; }

    // Skip if already have data for current element.
    if (item && item.name && item.id === idNum) {
      return;
    }

    fetchItem({ id })
      .then((d) => setItem(d))
      .catch((err) => {
        // Bad request
        setItem(false);
        console.error(err); // eslint-disable-line no-console
      });
  }, [item, location]);

  return item ? html `
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
  ` : null;
};

export default Item;
