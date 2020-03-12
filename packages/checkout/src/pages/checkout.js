import React from "react";

import PurchaseButton from "../components/purchase-button";
import { html } from "webpack-mfe-shared";

// ----------------------------------------------------------------------------
// Shared components
// ----------------------------------------------------------------------------
const Page = React.lazy(() => import("app_homepage/components/page"));

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
const CheckoutPage = () => html `
    <${Page} name="Checkout">
      <div style=${{ textAlign: "center" }} className="pure-u-1-1">
        <p style=${{ fontSize: "1.5em", lineHeight: "2em" }}>
          Click purchase to buy all items in your cart!
        </p>
        <${PurchaseButton} />
      </div>
    </${Page}>
  `;

const LazyCheckoutPage = (props) => html `
  <${React.Suspense} fallback=" ">
    <${CheckoutPage} ...${props} />
  </${React.Suspense}>
`;

export default LazyCheckoutPage;
