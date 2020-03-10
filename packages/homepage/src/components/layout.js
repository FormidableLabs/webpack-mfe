import * as React from "react";
import htm from "htm";
const html = htm.bind(React.createElement);

export const Layout = () => html `
  <div id="layout">
    <div id="menu">
      <div class="pure-menu">
        <a class="pure-menu-heading" href="#">Buy Stuff</a>
        <ul class="pure-menu-list">
          <li class="pure-menu-item"><a href="#" class="pure-menu-link">Homepage</a></li>
          <li class="pure-menu-item"><a href="#" class="pure-menu-link">Item</a></li>
          <li class="pure-menu-item"><a href="#" class="pure-menu-link">Search</a></li>
          <li class="pure-menu-item"><a href="#" class="pure-menu-link">Cart</a></li>
          <li class="pure-menu-item"><a href="#" class="pure-menu-link">Checkout</a></li>
        </ul>
      </div>
    </div>

    <div id="main">
      <div class="header">
        <h1>Homepage</h1>
      </div>
      <div class="content"></div>
    </div>
  </div>
`;
