import React from "react";

import htm from "htm";
const html = htm.bind(React.createElement);

const Page = React.lazy(() => import("app_homepage/components/page"));

const Items = () => html `
  <${Page}
    name="Items"
  >
    <div>
      Welcome to the item page!
    </div>
  </${Page}>
`;

const LazyItems = (props) => html `
  <${React.Suspense} fallback=" ">
    <${Items} ...${props} />
  </${React.Suspense}>
`;

export default LazyItems;
