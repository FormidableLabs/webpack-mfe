"use strict";

/**
 * Build and deploy docs to surge.
 */
const path = require("path");
const chalk = require("chalk");
const execa = require("execa");

const { TRAVIS_PULL_REQUEST, TRAVIS_JOB_NUMBER, PROD } = process.env;
const APPS = [
  "homepage",
  "item",
  "cart",
  "checkout"
];

const { log } = console;
const logMsg = (msg) => log(chalk `[{cyan deploy/surge}] ${msg}`);

const main = async () => {
  let domains;
  if (PROD) {
    domains = APPS.map((app) => `emojistore-${app}.surge.sh`);
  } else if (TRAVIS_PULL_REQUEST && TRAVIS_PULL_REQUEST !== "false") {
    domains = APPS.map((app) => `emojistore-staging-${TRAVIS_PULL_REQUEST}-${app}.surge.sh`);
  }

  if (!domains) {
    const info = JSON.stringify({ PROD, TRAVIS_PULL_REQUEST, TRAVIS_JOB_NUMBER });
    logMsg(chalk `Skipping surge deployment: {gray ${info}}`);
    return;
  }

  // Execution options.
  const envApps = Object.fromEntries(APPS.map((app, i) => [app, `https://${domains[i]}`]));
  const execOpts = {
    stdio: "inherit",
    env: {
      ...process.env,
      APPS: JSON.stringify(envApps)
    }
  };

  // Build.
  logMsg(chalk `Building applications {cyan ${JSON.stringify(APPS)}}`);
  await execa("yarn", ["build"], execOpts);

  // Deploy.
  logMsg(chalk `Preparing deploys to {cyan ${JSON.stringify(domains)}}`);
  await Promise.all(APPS.map(async (app, i) => {
    const domain = domains[i];
    const project = path.resolve(__dirname, `../../packages/${app}/dist`);
    logMsg(chalk `Deploying to ${PROD ? "production" : "staging"} {cyan ${domain}}`);

    // TODO: HERE -- Need to get this back into root webpack config as a build thing.
    // OR just build here...

    // TODO: HERE "--project", project, "--domain", domain
    await execa("bash", ["-c", "echo ${APPS}"], execOpts);
  }));
};

if (require.main === module) {
  main().catch((err) => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
  });
}
