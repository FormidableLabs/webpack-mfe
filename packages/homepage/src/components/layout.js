import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Menu } from "./menu";
import Homepage from "../pages/index";

import htm from "htm";
const Item = React.lazy(() => import("app_item/pages/index"));
const html = htm.bind(React.createElement);

const PAGE_ITEMS = [
  { name: "Homepage", to: "/" },
  { name: "Items", to: "/item" },
  { name: "Item 123", to: "/item/123" }
];

// TODO: Inject this from where we define it for webpack.
const APPS = process.env.APPS;
if (!APPS) {
  throw new Error("APPS environment variable required.");
}
const APP_ITEMS = Object.entries(APPS).map(([name, href]) => ({ name, href }));

const Layout = ({ app }) => html `
  <div id="layout">
    <${Router}>
      <${Menu} app="${app} (${location.port})" pages=${PAGE_ITEMS} apps=${APP_ITEMS} />
      <${Switch}>
        <${Route} exact path="/" component=${Homepage} />
        <${Route} exact path="/item/" component=${Item} />
        <${Route} path="/item/:id" component=${Item} />
      </${Switch}>
    </${Router}>
  </div>
`;

const LazyLayout = (props) => html `
  <${React.Suspense} fallback=" ">
    <${Layout} ...${props} />
  </${React.Suspense}>
`;

export default LazyLayout;
