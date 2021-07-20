"use strict";

const { GITHUB_REF, PROD } = process.env;
const GH_PULL_REQUEST = ((/refs\/pull\/([0-9]+)\/merge/).exec(GITHUB_REF || "") || [])[1];

const APPS = [
  "homepage",
  "item",
  "cart",
  "checkout"
];

const getDomain = (app) => {
  if (PROD === "true") {
    return `emojistore-${app}.surge.sh`;
  }

  if (GH_PULL_REQUEST) {
    return `emojistore-staging-${GH_PULL_REQUEST}-${app}.surge.sh`;
  }

  return null;
};

const getDomains = () => {
  const domains = APPS
    .map(getDomain)
    .filter(Boolean);

  return domains.length ? domains : null;
};

// Script
// $ node ./scripts/deploy/surge-domains.js DEPLOYMENT_URL
// DEPLOYMENT_URL=<GENERATED VALUE>
const main = async () => {
  // Return checkout domain
  const envVar = process.argv[2]; // eslint-disable-line no-magic-numbers
  if (!envVar) { throw new Error("Must pass environment variable name"); }

  const domain = getDomain("checkout") || "";
  process.stdout.write(domain ? `${envVar}=${domain}` : "");
};

if (require.main === module) {
  main().catch((err) => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
  });
}

// Exports
module.exports = {
  APPS,
  getDomains
};
