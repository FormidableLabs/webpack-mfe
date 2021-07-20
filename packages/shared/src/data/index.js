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

const _fetchItemCache = {};

export const fetchItem = ({ id, cache = true }) => {
  if (cache && _fetchItemCache[id]) {
    return Promise.resolve(_fetchItemCache[id]);
  }

  return _fetchEmoji({ query: `emojis/${id}` })
    .then((data = {}) => {
      let emojiData;

      // Legacy API
      if (Array.isArray(data.results)) {
        if (data.totals !== 1) {
          // eslint-disable-next-line no-console
          console.error(`Bad data for ${id}: ${JSON.stringify(data)}`);
          return null;
        }

        emojiData = data.results[0];
      }

      // Object form
      if (data.id >= 0) {
        emojiData = data;
      }


      if (cache) {
        _fetchItemCache[id] = emojiData;
      }

      return emojiData;
    });
};

export const fetchRandomItems = () => _fetchEmoji({ query: "random?limit=9" })
  .then((data) => data.results);
