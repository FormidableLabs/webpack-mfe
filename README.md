Webpack5 MFEs
=============

A short experiment to see webpack5 MFE support in action.

## Overview

We have five "independent" applications with shared components and libraries across them that we simulate within yarn workspaces. Really, these could be viewed as each independent repositories and applications. We run build watchers and localhost serving independently as follows:

- `packages/homepage` (`localhost:3001`)
- `packages/item` (`localhost:3002`)
- `packages/search` (`localhost:3003`)
- `packages/cart` (`localhost:3004`)
- `packages/checkout` (`localhost:3005`)

For convenience, these apps all share:

- `public/index.html`: Common HTML template
- `webpack.config.js`: Webpack config wrapper
- `serve.json`: A static localdev server configuration

## Development

You can run build and watches for all five at the same time with root project helper commands:

```sh
$ yarn start
```

Navigate to: http://localhost:3001/ for the entry in to the home page, or independently to any of the other application entry URLs.

## Resources

Demos:

- https://github.com/mizx/mfe-webpack-demo: Working demos using MFE.

Articles:

- https://dev.to/marais/webpack-5-and-module-federation-4j1i
- https://itnext.io/webpack-5-module-federation-a-game-changer-to-javascript-architecture-bcdd30e02669

## Notes

MFE / Infrastructure:

- To use anything shared or overrideable it appears the entire entry point needs to be wrapped in a dynamic `import()`.
- To import a component from another MFE, use something like `const Page = React.lazy(() => import("app_homepage/components/page"));`

This Demo:

- To keep this demo focused on the infrastructure, we've made shortcuts of having a minimal build (no `babel`, instead using `htm`), vanilla-ish React (`react` + `react-router-dom`), Pure CSS for styling, and no SSR, etc.
- Although a lot of the components need `React.Suspense`, there is no fallback UI provided.
