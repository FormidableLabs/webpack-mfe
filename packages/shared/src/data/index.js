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

const _fetchItemCache = {};

export const fetchItem = ({ id, cache = true }) => {
 if (cache && _fetchItemCache[id]) {
   return Promise.resolve(_fetchItemCache[id]);
 }

 return _fetchEmoji({ query: `emoji/${id}` })
   .then((data = {}) => {
     let emojiData = {
       id,
       name: data.code,
       emoji: data.moji
     };

     if (cache) {
       _fetchItemCache[id] = emojiData;
     }

     return emojiData;
   });
};

// TODO: PORT
export const fetchRandomItems = () => _fetchEmoji({ query: "random?limit=9" })
 .then((data) => data.results);
