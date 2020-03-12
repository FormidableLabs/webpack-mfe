import React from "react";
import { html } from "webpack-mfe-shared";

// ----------------------------------------------------------------------------
// Shared components
// ----------------------------------------------------------------------------
const Page = React.lazy(() => import("app_homepage/components/page"));

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
const ThankYouPage = () => html `
    <${Page} name="Checkout">
      <div style=${{ textAlign: "center" }} className="pure-u-1-1">
        <p style=${{ fontSize: "1.5em", lineHeight: "2em" }}>
          Thank you for your purchase!
        </p>
      </div>
    </${Page}>
  `;

const LazyThankYouPage = (props) => html `
  <${React.Suspense} fallback=" ">
    <${ThankYouPage} ...${props} />
  </${React.Suspense}>
`;

export default LazyThankYouPage;
