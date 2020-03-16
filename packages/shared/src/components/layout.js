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
// Since apps provide their own page components, lazily (+ eagerly) populate
// a global cache of pages to use.
const PAGE_CACHE = Object.fromEntries(Object.keys(PAGE_IMPORTS).map((name) => [name, null]));
let PAGE_CACHE_FILLED = false;

const suspenseWrapper = (Component) => (props) => html `
  <${React.Suspense} fallback=${null}>
    <${Component} ...${props} />
  </${React.Suspense}>
`;

const getPages = (pages) => {
  if (PAGE_CACHE_FILLED) { return PAGE_CACHE; }

  Object.keys(PAGE_CACHE).forEach((name) => {
    if (!PAGE_CACHE[name]) {
      PAGE_CACHE[name] = suspenseWrapper(
        pages[name] || React.lazy(eagerImport(PAGE_IMPORTS[name]))
      );
    }
  });

  PAGE_CACHE_FILLED = true;
  return PAGE_CACHE;
};

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------
const Layout = React.memo(({ app, pages = {} }) => {
  // Lazy imports, using provided pages directly first.
  // Each app container is responsible for injecting direct pages.
  const allPages = getPages(pages);
  const {
    Homepage,
    ItemsPage,
    ItemPage,
    CartPage,
    CheckoutPage,
    ThankYouPage
  } = allPages;

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
