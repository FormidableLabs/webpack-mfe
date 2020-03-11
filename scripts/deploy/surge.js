"use strict";

/**
 * Upload docs to surge.
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

const EXECA_OPTS = {
  stdio: "inherit"
};

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

  logMsg(chalk `Uploading files to {cyan ${JSON.stringify(domains)}}`);
  await Promise.all(APPS.map(async (app, i) => {
    const domain = domains[i];
    const project = path.resolve(__dirname, `../../packages/${app}/dist`);
    logMsg(chalk `Deploying {cyan ${domain}}`);

    // TODO: HERE -- Need to get this back into root webpack config as a build thing.
    // OR just build here...
    await execa("echo", ["--project", project, "--domain", domain], EXECA_OPTS);
  }));
};

if (require.main === module) {
  main().catch((err) => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
  });
}
