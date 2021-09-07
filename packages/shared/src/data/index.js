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

// HACK: As of 9/7/2021 there are 8944 emojis, indexed by popularity.
// To provide "better" emojis, we limit to first 1000.
// We'd also like to only limit to only the 9 we need, but many times
// you will get null emojis, so try to use non-null first.
const NUM_EMOJIS_TOTAL = 1000;
const PER_PAGE_MULTIPLIER = 3;

const _getRandomPage = (num) =>
  Math.floor(Math.random() * (NUM_EMOJIS_TOTAL / (num * PER_PAGE_MULTIPLIER)));

// Emojidex doesn't have a random endpoint, so we just do a capped query at 9
// emojis fetching a random page through all the data.
export const fetchRandomItems = (num) => _fetchEmoji({
  query: `emoji?limit=${num * PER_PAGE_MULTIPLIER}&page=${_getRandomPage(num)}`
})
  .then(({ emoji = [] } = {}) => {
    // Iterate and fill arrays in priority order (ascii + emoji first)
    const ascii = [];
    const nonAscii = [];
    const noEmoji = [];

    emoji.forEach((data) => {
      if (data.moji) {
        // eslint-disable-next-line no-control-regex
        if ((/^[\x00-\x7F]*$/).test(data.code)) {
          ascii.push(data);
        } else {
          nonAscii.push(data);
        }
      } else {
        noEmoji.push(data);
      }
    });

    return []
      .concat(ascii, nonAscii, noEmoji)
      .slice(0, num)
      .map(_normalizeData);
  });
