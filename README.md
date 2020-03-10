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

## Development

You can run build and watches for all five at the same time with root project helper commands:

```sh
$ yarn start
```

Navigate to: http://localhost:3001/ for the entry in to the home page, or independently to any of the other application entry URLs.

# Resources

- https://github.com/mizx/mfe-webpack-demo: Working demos using MFE.
