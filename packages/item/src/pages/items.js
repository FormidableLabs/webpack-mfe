import React from "react";

import Item from "../components/item";
import { html, fetchRandomItems, Page } from "webpack-mfe-shared";

const Message = ({ msg }) => html `
  <div style=${{ textAlign: "center" }} className="pure-u-1-1">
    <p style=${{ fontSize: "1.5em", lineHeight: "2em" }}>${msg}</p>
  </div>
`;

const ItemsPage = () => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetchRandomItems()
      .then((d) => setData(d))
      .catch(() => {});
  }, []);

  return html `
    <${Page} name="Items">
      <${Message} msg="${data ? "A random assortment of emojis!" : "Loading items.."}" />
      ${(data || []).map((item) => html `<${Item} ...${item} key="item-${item.id}" />`)}
    </${Page}>
  `;
};


export default ItemsPage;
