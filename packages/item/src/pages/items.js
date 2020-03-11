import React from "react";

import { Item } from "../components/item";
import { fetchRandomItems } from "../data/index";

import htm from "htm";
const html = htm.bind(React.createElement);

// ----------------------------------------------------------------------------
// Shared components
// ----------------------------------------------------------------------------
const Page = React.lazy(() => import("app_homepage/components/page"));

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
const Frame = ({ children }) => html `
  <div className="pure-g">
    ${children}
  </div>
`;

const Message = ({ msg }) => html `
  <div style=${{ textAlign: "center" }} className="pure-u-1-1">
    <p style=${{ fontSize: "1.5em", lineHeight: "2em" }}>${msg}</p>
  </div>
`;

const ItemsPage = () => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetchRandomItems().then((d) => setData(d)).catch(() => {});
  }, []);

  return html `
    <${Page}
      name="Items"
    >
      <${Frame}>
        <${Message} msg="${data ? "A random assortment of emojis!" : "Loading items.."}" />
        ${(data || []).map((item) => html `<${Item} ...${item} key="item-${item.id}" />`)}
      </${Frame}>
    </${Page}>
  `;
};

const LazyItemsPage = (props) => html `
  <${React.Suspense} fallback=" ">
    <${ItemsPage} ...${props} />
  </${React.Suspense}>
`;

export default LazyItemsPage;
