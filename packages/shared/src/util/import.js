// Eagerly fetch and resolve import()'s without blocking for later faster use.
//
// ```js
// const Hompage = React.lazy(eagerImport(() => import("app_homepage/pages/homepage")));
// ```
//
// **Note**: Cannot use with circular dependencies!
export const eagerImport = (importFn) => {
  // Call the promise without waiting on it.
  const prom = importFn();
  return () => prom;
};
