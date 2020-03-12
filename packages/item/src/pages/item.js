import Item from "../components/item";
import { html, Page } from "webpack-mfe-shared";

const ItemPage = ({ location, match }) => {
  const item = ((location || {}).state || {}).item;
  const id = ((match || {}).params || {}).id;

  return html `
    <${Page} name="Item">
      <div className="pure-u-1-3"></div>
      <${Item} ...${item || { id }} />
      <div className="pure-u-1-3"></div>
    </${Page}>
  `;
};

export default ItemPage;
