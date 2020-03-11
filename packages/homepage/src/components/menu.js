/**
 * Common menu for all apps.
 */

import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import htm from "htm";
const html = htm.bind(React.createElement);

export const MenuHeader = ({ name, to }) => html `
  <${Link} className="pure-menu-heading" to="${to}">${name}</${Link}>
`;

export const MenuPage = ({ name, to }) => {
  const location = useLocation();
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    setActive(to === location.pathname);
  }, [location]);

  return html `
    <li className="pure-menu-item${active ? " pure-menu-selected" : ""}">
      <${NavLink} className="pure-menu-link" to="${to}">
        ${name}
      </${NavLink}>
    </li>
  `;
};

export const MenuApp = ({ name, href }) => {
  // Add port if number specified
  const port = (/:[0-9]+$/).test(href) ? ` (${href.split(":").pop()})` : "";
  const active = href.startsWith(location.origin);
  return html `
    <li className="pure-menu-item${active ? " pure-menu-selected" : ""}">
      <a className="pure-menu-link" href="${href}">
        ${name}${port}
      </a>
    </li>
  `;
};

export const Menu = ({ app, pages = [], apps = [] }) => html `
  <div id="menu">
    <nav className="pure-menu">
      <${MenuHeader} name="${app}" to="/" />
      <ul className="pure-menu-list">
        <li className="pure-menu-heading">Pages</li>
        ${pages.map((props, i) => html `<${MenuPage} key=${`menu-link-${i}`} ...${props} />`)}
        <li className="pure-menu-heading">Apps</li>
        ${apps.map((props, i) => html `<${MenuApp} key=${`menu-app-${i}`} ...${props} />`)}
      </ul>
      <div className="pure-menu-divided" />
    </nav>
  </div>
`;
