import React from "react";

import htm from "htm";

import { Item } from "../components/item";
import { fetchItem } from "../data/index";
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
    <div className="pure-u-1-3"></div>
    ${children}
    <div className="pure-u-1-3"></div>
  </div>
`;

const Loading = ({ id }) => html `
  <div style=${{ textAlign: "center" }} className="pure-u-1-3">
    <em style=${{ fontSize: "1.5em", lineHeight: "2em" }}>Loading item ${id}...</em>
  </div>
`;

const ItemPage = ({ match: { params: { id } } }) => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    fetchItem({ id }).then((emoji) => setData(emoji));
  }, []);

  return html `
    <${Page}
      name="Item"
    >
      <${Frame}>
        ${data ? html `<${Item} ...${data} />` : html `<${Loading} id="${id}" />`}
      </${Frame}>
    </${Page}>
  `;
};

const LazyItemPage = (props) => html `
  <${React.Suspense} fallback=" ">
    <${ItemPage} ...${props} />
  </${React.Suspense}>
`;

export default LazyItemPage;
