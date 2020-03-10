import * as React from "react";
import { Link, NavLink } from "react-router-dom";

import htm from "htm";
const html = htm.bind(React.createElement);

export const MenuHeader = ({ name, to }) => html `
  <${Link} className="pure-menu-heading" to="${to}">${name}</${Link}>
`;

export const MenuItem = ({ name, to }) => html `
  <li className="pure-menu-item">
    <${NavLink}
      className="pure-menu-link"
      to="${to}"
    >
      ${name}
    </${NavLink}>
  </li>
`;

export const Menu = ({ app, items = [] }) => html `
  <div id="menu">
    <nav className="pure-menu">
      <${MenuHeader} name="${app}" to="/" />
      <ul className="pure-menu-list">
        ${items.map((props, i) => html `<${MenuItem} key=${`menu-item-${i}`} ...${props} />`)}
      </ul>
    </nav>
  </div>
`;
