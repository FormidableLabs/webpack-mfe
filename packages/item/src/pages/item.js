import React from "react";
import { useLocation } from "react-router-dom";

import { Item } from "../components/item";
import { fetchItem } from "../data/index";

import htm from "htm";
const html = htm.bind(React.createElement);

// ----------------------------------------------------------------------------
// Shared components
// ----------------------------------------------------------------------------
const Page = React.lazy(() => import("app_homepage/components/page"));

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
const Loading = ({ id }) => html `
  <div style=${{ textAlign: "center" }} className="pure-u-1-3">
    <em style=${{ fontSize: "1.5em", lineHeight: "2em" }}>Loading item ${id}...</em>
  </div>
`;

const ItemPage = ({ location, match }) => {
  // Props.
  const item = ((location || {}).state || {}).item;
  const id = ((match || {}).params || {}).id;

  // Hooks.
  const loc = useLocation();
  const [data, setData] = React.useState(item);
  React.useEffect(() => {
    // Skip if already have data for current element.
    if (data && data.id === parseInt(id, 10)) {
      return;
    }

    fetchItem({ id }).then((d) => setData(d)).catch(() => {});
  }, [loc]);

  return html `
    <${Page} name="Item">
      <div className="pure-u-1-3"></div>
      ${data ? html `<${Item} ...${data} />` : html `<${Loading} id=${id} />`}
      <div className="pure-u-1-3"></div>
    </${Page}>
  `;
};

const LazyItemPage = (props) => html `
  <${React.Suspense} fallback=" ">
    <${ItemPage} ...${props} />
  </${React.Suspense}>
`;

export default LazyItemPage;
