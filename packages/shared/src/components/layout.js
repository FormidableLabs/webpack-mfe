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

// TODO(SSR): Inject this from where we define it for webpack.
const APPS = process.env.APPS;
if (!APPS) {
  throw new Error("APPS environment variable required.");
}
const APP_LINKS = Object.entries(APPS).map(([name, href]) => ({ name, href }));

// ----------------------------------------------------------------------------
// Lazy, shared components
// ----------------------------------------------------------------------------
// Simple wrapper for lazy components.
const suspenseWrapper = (Component) => (props) => html `
  <${React.Suspense} fallback=${null}>
    <${Component} ...${props} />
  </${React.Suspense}>
`;

// These imports are what we'd normally just push in a `React.lazy()`. We wrap
// them with `React.lazy(eagerImport())` to begin loading them in the background
// before actual use.
const PAGE_IMPORTS = {
  Homepage: () => import("app_homepage/pages/homepage"),
  ItemsPage: () => import("app_item/pages/items"),
  ItemPage: () => import("app_item/pages/item"),
  CartPage: () => import("app_cart/pages/cart"),
  CheckoutPage: () => import("app_checkout/pages/checkout"),
  ThankYouPage: () => import("app_checkout/pages/thank-you")
};

// Wrapped up page components for use.
const PAGES = Object.keys(PAGE_IMPORTS).reduce((pages, name) => {
  pages[name] = suspenseWrapper(React.lazy(eagerImport(PAGE_IMPORTS[name])));
  return pages;
}, {});

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------
const Layout = React.memo(({ app }) => {
  const {
    Homepage,
    ItemsPage,
    ItemPage,
    CartPage,
    CheckoutPage,
    ThankYouPage
  } = PAGES;

  return html `
    <div id="layout" key="layout" >
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
});

export default Layout;
