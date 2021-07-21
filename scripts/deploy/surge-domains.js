"use strict";

const { GITHUB_REF, PROD } = process.env;
const GH_PULL_REQUEST = ((/refs\/pull\/([0-9]+)\/merge/).exec(GITHUB_REF || "") || [])[1];

const APPS = [
  "homepage",
  "item",
  "cart",
  "checkout"
];

// For GitHub deployments
const getEnvironment = () => {
  if (PROD === "true") {
    return "production";
  }

  if (GH_PULL_REQUEST) {
    return `staging-${GH_PULL_REQUEST}`;
  }

  return "unknown";
};

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

// Exports
module.exports = {
  APPS,
  getDomains
};

// ============================================================================
// Script
// ============================================================================
const ACTIONS = {
  url: () => {
    // Return checkout domain
    const envVar = process.argv[3]; // eslint-disable-line no-magic-numbers
    if (!envVar) { throw new Error("Must pass environment variable name"); }

    const domain = getDomain("checkout") || "";
    process.stdout.write(domain ? `${envVar}=${domain}` : "");
  },
  env: () => {
    const envVar = process.argv[3]; // eslint-disable-line no-magic-numbers
    if (!envVar) { throw new Error("Must pass environment variable name"); }

    process.stdout.write(`${envVar}=${getEnvironment()}`);
  }
};

// $ node ./scripts/deploy/surge-domains.js <action> [opts]
// $ node ./scripts/deploy/surge-domains.js url DEPLOYMENT_URL
// DEPLOYMENT_URL=<GENERATED VALUE>
// $ node ./scripts/deploy/surge-domains.js env DEPLOYMENT_ENV
// DEPLOYMENT_ENV=<production|staging-<PR_NUM>>
const main = async () => {
  const action = process.argv[2]; // eslint-disable-line no-magic-numbers
  if (!action) {
    throw new Error(`Unknown action: ${action}`);
  }

  ACTIONS[action]();
};

if (require.main === module) {
  main().catch((err) => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
  });
}
