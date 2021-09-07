/**
 * Data helpers
 *
 * Uses: https://github.com/abourtnik/emojis-world
 */

const _fetchEmoji = ({ query }) => fetch(`https://www.emojidex.com/api/v1/${query}`)
  .then((response) => response.json())
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(`Fetch error for ${query}: ${err}`);
    return null;
  });

// Convert raw data to our normalized internal format.
const _normalizeData = ({ id, code, moji }) => ({
  id: id || (code || "").replace(/ /g, "_"),
  name: code,
  emoji: moji
});
const _fetchItemCache = {};

export const fetchItem = ({ id, cache = true }) => {
  if (cache && _fetchItemCache[id]) {
    return Promise.resolve(_fetchItemCache[id]);
  }

  return _fetchEmoji({ query: `emoji/${id}` })
    .then((data = {}) => {
      const emojiData = _normalizeData(Object.assign({ id }, data));

      if (cache) {
        _fetchItemCache[id] = emojiData;
      }

      return emojiData;
    });
};

// HACK: Number of pages as of 9/7/2021 for `limit=9`.
const NUM_EMOJIS = 8944;
const NUM_PER_PAGE = 9;
const NUM_PAGES = NUM_EMOJIS / NUM_PER_PAGE;

const _getRandomPage = () => Math.floor(Math.random() * NUM_PAGES);

// Emojidex doesn't have a random endpoint, so we just do a capped query at 9
// emojis fetching a random page through all the data.
export const fetchRandomItems = () => _fetchEmoji({
  query: `emoji?limit=9&page=${_getRandomPage()}`
})
  .then((data) => (data.emoji || []).map(_normalizeData))
  .then((d) => {
    console.log("TODO RANDOM", { d });
    return d;
  });
