import React from "react";
import { html, fetchItem, eagerImport, Page } from "webpack-mfe-shared";

// eslint-disable-next-line import/no-unresolved
const Item = React.lazy(eagerImport(() => import("app_item/components/item")));

const FAVS = [
  { id: "dog" },
  { id: "tada" },
  { id: "T-Rex" }
];

const Homepage = () => {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    // Skip if already have data.
    if (items.length) {
      return;
    }

    Promise
      .all(FAVS.map(({ id }) => fetchItem({ id })))
      .then((favs) => setItems(favs))
      .catch((err) => {
        console.err(err); // eslint-disable-line no-console
      });
  }, [items]);

  return html `
    <${Page} name="Homepage">
      <div style=${{ textAlign: "center" }} className="pure-u-1-1">
        <p style=${{ fontSize: "1.5em", lineHeight: "2em" }}>
          Welcome to the emoji store!
        </p>
        ${items.map((props) => html `
          <${React.Suspense} fallback=${null} key="home-item-${props.id}">
            <${Item} ...${props} />
          </${React.Suspense}>
        `)}
      </div>
    </${Page}>
  `;
};

export default Homepage;
