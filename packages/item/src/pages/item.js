import Item from "../components/item";
import { html, Page } from "webpack-mfe-shared";

// Default: cat face
const DEFAULT_ID = "cat";

const ItemPage = ({ location, match }) => {
  const item = ((location || {}).state || {}).item;
  const id = ((match || {}).params || {}).id || DEFAULT_ID;

  return html `
    <${Page} name="Item">
      <div className="pure-u-1-3"></div>
      <${Item} ...${item || { id }} />
      <div className="pure-u-1-3"></div>
    </${Page}>
  `;
};

export default ItemPage;
