/**
 * Data helpers
 *
 * Uses: https://github.com/abourtnik/emojis-world
 */
// TODO: Memoize data fetch?

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

export const fetchRandomItems = () => _fetchEmoji({ query: "random?limit=9" })
  .then((data) => data.results);
