// Eagerly fetch and resolve import()'s without blocking for later faster use.
// ```js
// const Button = React.lazy(eagerImport("app_buttons/button"));
// ```
//
// TODO: Doesn't work when using as specified above.
export const eagerImport = (url) => {
  const prom = import(url);
  return () => prom;
};
