import { html, Page } from "webpack-mfe-shared";

const ThankYouPage = () => html `
  <${Page} name="Checkout">
    <div style=${{ textAlign: "center" }} className="pure-u-1-1">
      <p style=${{ fontSize: "1.5em", lineHeight: "2em" }}>
        Thank you for your purchase!
      </p>
    </div>
  </${Page}>
`;

export default ThankYouPage;
