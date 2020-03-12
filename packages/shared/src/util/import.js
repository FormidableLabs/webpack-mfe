// Eagerly fetch and resolve import()'s without blocking for later faster use.
//
// ```js
// const Hompage = React.lazy(eagerImport(() => import("app_homepage/pages/homepage")));
// ```
//
// **Note**: Cannot use with circular dependencies!
export const eagerImport = (importFn) => {
  const prom = importFn().then((mod) => {
    // TODO REMOVE DEBUG.
    console.log("eagerImport", {
      fn: importFn.toString().match(/\/\*\! (app_.*?) \*\//)[1]
    });
    return mod;
  });
  return () => prom;
};
