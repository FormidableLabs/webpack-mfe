import React from "react";

import htm from "htm";
const html = htm.bind(React.createElement);

// ----------------------------------------------------------------------------
// Shared components
// ----------------------------------------------------------------------------
const Page = React.lazy(() => import("app_homepage/components/page"));

// ----------------------------------------------------------------------------
// Data
// ----------------------------------------------------------------------------
// Uses https://github.com/abourtnik/emojis-world
const fetchEmoji = (id) => fetch(`https://api.emojisworld.io/v1/emojis/${id}`)
  .then((response) => response.json())
  .then((json = {}) => {
    if (json.totals !== 1) {
      // eslint-disable-next-line no-console
      console.error(`Bad data for ${id}: ${JSON.stringify(json)}`);
      return null;
    }

    return json.results[0];
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(`Fetch error for ${id}: ${err}`);
    return null;
  });

// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------
const Frame = ({ children }) => html `
  <div className="pure-g">
    <div className="pure-u-1-3"></div>
    ${children}
    <div className="pure-u-1-3"></div>
  </div>
`;

const Emoji = ({ name, emoji }) => html `
  <${Frame}>
    <div style=${{ textAlign: "center", backgroundColor: "#eeeeee" }} className="pure-u-1-3">
      <p style=${{ fontSize: "10em" }}>${emoji}</p>
      <p style=${{ fontSize: "2em" }}>${name}</p>
    </div>
  </${Frame}>
`;

const Loading = ({ id }) => html `
  <${Frame}>
    <div style=${{ textAlign: "center" }} className="pure-u-1-3">
      <em style=${{ fontSize: "1.5em", lineHeight: "2em" }}>Loading item ${id}...</em>
    </div>
  </${Frame}>
`;

const Item = ({ match: { params: { id } } }) => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    // eslint-disable-next-line promise/catch-or-return
    fetchEmoji(id).then((emoji) => setData(emoji));
  }, []);

  return html `
    <${Page}
      name="Item"
    >
      <div>
        ${data ? html `<${Emoji} ...${data} />` : html `<${Loading} id="${id}" />`}
      </div>
    </${Page}>
  `;
};

const LazyItem = (props) => html `
  <${React.Suspense} fallback=" ">
    <${Item} ...${props} />
  </${React.Suspense}>
`;

export default LazyItem;
