import React from "react";

import { Item } from "../components/item";

import htm from "htm";
const html = htm.bind(React.createElement);

// ----------------------------------------------------------------------------
// Shared components
// ----------------------------------------------------------------------------
const Page = React.lazy(() => import("app_homepage/components/page"));

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
const ItemPage = ({ location, match }) => {
  const item = ((location || {}).state || {}).item;
  const id = ((match || {}).params || {}).id;

  return html `
    <${Page} name="Item">
      <div className="pure-u-1-3"></div>
      <${Item} ...${item || { id }} />
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