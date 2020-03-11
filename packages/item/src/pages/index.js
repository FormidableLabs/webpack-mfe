import React from "react";

import htm from "htm";
const html = htm.bind(React.createElement);

const Page = React.lazy(() => import("app_homepage/components/page"));

const Item = ({ match: { params: { id } } }) => html `
  <${Page}
    name="Item"
  >
    <div>
      ${id ? `You have chosen item ${id}` : "Welcome to the item page."}
    </div>
  </${Page}>
`;

const LazyItem = (props) => html `
  <${React.Suspense} fallback=" ">
    <${Item} ...${props} />
  </${React.Suspense}>
`;

export default LazyItem;
