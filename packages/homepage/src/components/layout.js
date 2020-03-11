import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Menu } from "./menu";
import Page from "./page";

import htm from "htm";
const html = htm.bind(React.createElement);

const Homepage = () => html `
  <${Page}
    name="Homepage"
  >
    <div>
      This is the homepage.
    </div>
  </${Page}>
`;

const Item = ({ match: { params: { id } } }) => html `
  <${Page}
    name="Item"
  >
    <div>
      ${id ? `You have chosen item ${id}` : "Welcome to the item page."}
    </div>
  </${Page}>
`;

const ITEMS = [
  { name: "Homepage", to: "/" },
  { name: "Items", to: "/item" },
  { name: "Item 123", to: "/item/123" }
];

const Layout = ({ app = "Ecom Site" }) => html `
  <div id="layout">
    <${Router}>
      <${Menu} app=${app} items=${ITEMS} />
      <${Switch}>
        <${Route} exact path="/" component=${Homepage} />
        <${Route} exact path="/item/" component=${Item} />
        <${Route} path="/item/:id" component=${Item} />
      </${Switch}>
    </${Router}>
  </div>
`;

export default Layout;

