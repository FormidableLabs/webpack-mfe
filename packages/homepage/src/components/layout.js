import * as React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { Menu } from "./menu";
import { Page } from "./page";

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


const Item = ({ match: { params: { id = "NOT SET" } } }) => html `
  <${Page}
    name="Item"
  >
    <div>
      You have chosen Item No. <code>${id}</code>
    </div>
  </${Page}>
`;

const ITEMS = [
  { name: "Homepage", to: "/" },
  { name: "Item 123", to: "/item/123" }
];

export const Layout = ({ app = "Ecom Site" }) => html `
  <div id="layout">
    <${Router}>
      <${Menu} app=${app} items=${ITEMS} />
      <${Switch}>
        <${Route} exact path="/" component=${Homepage} />
        <${Route} path="/item/:id" component=${Item} />
      </${Switch}>
    </${Router}>


  </div>
`;

/*

const URLS = {
  homepage: "http://127.0.0.1:3001",
  item: "http://127.0.0.1:3002",
  search: "http://127.0.0.1:3003",
  cart: "http://127.0.0.1:3004",
  checkout: "http://127.0.0.1:3005",
}
    <${MenuItem} name="Homepage" to="${URLS.homepage}" />
    <${MenuItem} name="Item" to="#TODO" />
    <${MenuItem} name="Search" to="#TODO" />
    <${MenuItem} name="Cart" to="#TODO" />
    <${MenuItem} name="Checkout" to="#TODO" />
*/
