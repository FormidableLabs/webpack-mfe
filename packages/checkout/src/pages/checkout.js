import React from "react";

import PurchaseButton from "../components/purchase-button";
import { html, Page } from "webpack-mfe-shared";

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
