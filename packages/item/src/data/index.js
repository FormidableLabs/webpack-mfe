/**
 * Data helpers
 *
 * Uses: https://github.com/abourtnik/emojis-world
 */

const _fetchEmoji = ({ query }) => fetch(`https://api.emojisworld.io/v1/${query}`)
  .then((response) => response.json())
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(`Fetch error for ${query}: ${err}`);
    return null;
  });

export const fetchItem = ({ id }) => _fetchEmoji({ query: `emojis/${id}` })
  .then((data = {}) => {
    if (data.totals !== 1) {
      // eslint-disable-next-line no-console
      console.error(`Bad data for ${id}: ${JSON.stringify(data)}`);
      return null;
    }

    return data.results[0];
  });
