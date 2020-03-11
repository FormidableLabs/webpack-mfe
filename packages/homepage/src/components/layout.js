/**
 * Common layout for all apps.
 *
 * **Note**: A lot of this would normally be split and organized
 */

import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Menu } from "./menu";
import Homepage from "../pages/index";

import htm from "htm";
const html = htm.bind(React.createElement);

// ----------------------------------------------------------------------------
// Shared components
// ----------------------------------------------------------------------------
const ItemsPage = React.lazy(() => import("app_item/pages/items"));
const ItemPage = React.lazy(() => import("app_item/pages/item"));
const CartPage = React.lazy(() => import("app_cart/pages/cart"));

// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------
// TODO: Move this somewhere else?
const PAGE_LINKS = [
  { name: "Homepage", to: "/" },
  { name: "Items", to: "/item" },
  { name: "Item (Cat)", to: "/item/102" },
  { name: "Cart", to: "/cart" }
];

// TODO: Inject this from where we define it for webpack.
const APPS = process.env.APPS;
if (!APPS) {
  throw new Error("APPS environment variable required.");
}
const APP_LINKS = Object.entries(APPS).map(([name, href]) => ({ name, href }));

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------
const Layout = ({ app }) => html `
  <div id="layout">
    <${Router}>
      <${Menu} app="${app} (${location.port})" pages=${PAGE_LINKS} apps=${APP_LINKS} />
      <${Switch}>
        <${Route} exact=${true} path="/" component=${Homepage} />
        <${Route} exact=${true} path="/item/" component=${ItemsPage} />
        <${Route} exact=${true} path="/item/:id" component=${ItemPage} />
        <${Route} exact=${true} path="/cart" component=${CartPage} />
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
