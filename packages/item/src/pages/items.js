import React from "react";

import Item from "../components/item";
import { html } from "webpack-mfe-shared";

// TODO: Abstract this (or a memo fn).
const _data = () => {
  _data.prom = _data.prom || import("app_homepage/data/index");
  return _data.prom;
};

// ----------------------------------------------------------------------------
// Shared components
// ----------------------------------------------------------------------------
const Page = React.lazy(() => import("app_homepage/components/page"));

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
const Message = ({ msg }) => html `
  <div style=${{ textAlign: "center" }} className="pure-u-1-1">
    <p style=${{ fontSize: "1.5em", lineHeight: "2em" }}>${msg}</p>
  </div>
`;

const ItemsPage = () => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    _data()
      .then(({ fetchRandomItems }) => fetchRandomItems())
      .then((d) => setData(d))
      .catch(() => {});
  }, []);

  return html `
    <${Page} name="Items">
      <${Message} msg="${data ? "A random assortment of emojis!" : "Loading items.."}" />
      ${(data || []).map((item) => html `<${Item} ...${item} key="item-${item.id}" />`)}
    </${Page}>
  `;
};

const LazyItemsPage = (props) => html `
  <${React.Suspense} fallback=" ">
    <${ItemsPage} ...${props} />
  </${React.Suspense}>
`;

export default LazyItemsPage;
