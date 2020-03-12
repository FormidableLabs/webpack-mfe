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
import { html } from "../util/html";
import { eagerImport } from "../util/import";

// ----------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------
// TODO: Move this somewhere else?
const PAGE_LINKS = [
  { name: "Homepage", to: "/" },
  { name: "Items", to: "/item" },
  { name: "Item (Cat)", to: "/item/102" },
  { name: "Cart", to: "/cart" },
  { name: "Checkout", to: "/checkout" }
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
let Homepage;
let ItemsPage;
let ItemPage;
let CartPage;
let CheckoutPage;
let ThankYouPage;
const Layout = ({ app, pages = {} }) => {
  console.log("TODO HERE", { app, pages });
  // Lazy imports, using provided pages directly first.
  // Each app container is responsible for injecting direct pages.
  Homepage = Homepage || pages.Homepage || React.lazy(eagerImport(() => import("app_homepage/pages/homepage")));
  ItemsPage = ItemsPage || pages.ItemsPage || React.lazy(eagerImport(() => import("app_item/pages/items")));
  ItemPage = ItemPage || pages.ItemPage || React.lazy(eagerImport(() => import("app_item/pages/item")));
  CartPage = CartPage || pages.CartPage || React.lazy(eagerImport(() => import("app_cart/pages/cart")));
  CheckoutPage = CheckoutPage || pages.CheckoutPage || React.lazy(eagerImport(() => import("app_checkout/pages/checkout")));
  ThankYouPage = ThankYouPage || pages.ThankYouPage || React.lazy(eagerImport(() => import("app_checkout/pages/thank-you")));

  return html `
    <div id="layout">
      <${Router}>
        <${Menu}
          app="${app}${location.port ? ` (${location.port})` : ""}"
          pages=${PAGE_LINKS}
          apps=${APP_LINKS}
        />
        <${Switch}>
          <${Route} exact=${true} path="/" component=${Homepage} />
          <${Route} exact=${true} path="/item/" component=${ItemsPage} />
          <${Route} exact=${true} path="/item/:id" component=${ItemPage} />
          <${Route} exact=${true} path="/cart" component=${CartPage} />
          <${Route} exact=${true} path="/checkout" component=${CheckoutPage} />
          <${Route} exact=${true} path="/checkout/thank-you" component=${ThankYouPage} />
        </${Switch}>
      </${Router}>
    </div>
  `;
};

const LazyLayout = (props) => html `
  <${React.Suspense} fallback=" ">
    <${Layout} ...${props} />
  </${React.Suspense}>
`;

export default LazyLayout;
