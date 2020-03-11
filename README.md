Webpack5 MFEs
=============

A short experiment to see webpack5 MFE support in action.

## Overview

We have four "independent" applications with shared components and libraries across them that we simulate within yarn workspaces. Really, these could be viewed as each independent repositories and applications.

For simplicity all the applications essentially contain the same content and navbar, but differ in that they get code locally from their own app and consume shared code everywhere else via module federation.

For a simple tour, navigate to http://127.0.0.1:3001/ -- this is the homepage application. Looking at the navigation bar, you can see a `HOME (3001)` heading indicating you are in the homepage application server on port 3001. Further down the menu you see a `PAGES` heading with options for:

- `Homepage`: Favorite item links
- `Items`: A random selection of items
- `Item (Cat)`: A specific cat

All of the above are served within the 3001 homepage application server (although relevant other application supply code under the hood). Clicking on anything just does history push state and does _not_ cause a real HTTP navigation to a new page.

Continuing down the menu bar to the `APPS` heading with links to all the applications. These links will cause a completely new HTTP navigation to a different application server page (on a different port).

## Architecture

We run build watchers and localhost serving independently as follows (with relevant `exposes` federated components / code):

- `packages/homepage` (`localhost:3001`)
    - `data/index`: REST API data fetcher (for emojis!)
    - `components/layout`: Common application shell (page layout)s
    - `components/page`: Content component
- `packages/item` (`localhost:3002`)
    - `components/item`: A single item (with internal data fetching)
    - `pages/items`: Items landing page (random items)
    - `pages/item`: Single item page
- `packages/cart` (`localhost:3003`)
- `packages/checkout` (`localhost:3004`)

Each of the applications share the following vendor code:

- `react`
- `react-dom`
- `react-router-dom`

For convenience, these apps all share via the root package (would be independent in real scenario).

- `public/index.html`: Common HTML template
- `webpack.config.js`: Webpack config wrapper
- `serve.json`: A static localdev server configuration

## Development

You can run build and watches for all four at the same time with root project helper commands:

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
