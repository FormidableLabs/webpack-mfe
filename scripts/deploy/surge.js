"use strict";

/**
 * Build and deploy docs to surge.
 */
const path = require("path");
const chalk = require("chalk");
const execa = require("execa");

const { GITHUB_REF, GITHUB_RUN_ID, PROD } = process.env;
const APPS = [
  "homepage",
  "item",
  "cart",
  "checkout"
];

const { log } = console;
const logMsg = (msg) => log(chalk `[{cyan deploy/surge}] ${msg}`);

// eslint-disable-next-line max-statements
const main = async () => {
  let domains;
  if (PROD) {
    domains = APPS.map((app) => `emojistore-${app}.surge.sh`);
  } else if (GITHUB_REF) {
    const ghMatch = (/refs\/pull\/([0-9]+)\/merge/).exec(GITHUB_REF);
    if (ghMatch && ghMatch[1]) {
      const ghPullRequest = ghMatch[1];
      domains = APPS.map((app) => `emojistore-staging-${ghPullRequest}-${app}.surge.sh`);
    }
  }

  if (!domains) {
    const info = JSON.stringify({ PROD, GITHUB_REF, GITHUB_RUN_ID });
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
    await execa("surge", ["--project", project, "--domain", domain], execOpts);
  }));
};

if (require.main === module) {
  main().catch((err) => {
    console.error(err); // eslint-disable-line no-console
    process.exit(1); // eslint-disable-line no-process-exit
  });
}
