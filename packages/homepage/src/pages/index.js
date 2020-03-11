import React from "react";
import Page from "../components/page";

import { fetchItem } from "../data/index";

import htm from "htm";
const html = htm.bind(React.createElement);

const Item = React.lazy(() => import("app_item/components/item"));

const FAVS = [
  { emoji: "🐶", id: 1275 },
  { emoji: "🎉", id: 1691 },
  { emoji: "🦖", id: 1340 }
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
      .catch(() => {});
  }, [items]);

  return html `
    <${Page} name="Homepage">
      <div style=${{ textAlign: "center" }} className="pure-u-1-1">
        <p style=${{ fontSize: "1.5em", lineHeight: "2em" }}>
          Welcome to the emoji store!
        </p>
        ${items.map((props) => html `<${Item} ...${props} />`)}
      </div>
    </${Page}>
  `;
};

export default Homepage;
