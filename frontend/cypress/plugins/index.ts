// const admin = require("firebase-admin");
require("../support/commands");

const cypressFirebasePlugin = require("cypress-firebase").plugin;

module.exports = (on: unknown, config: unknown) => {
  const extendedConfig = cypressFirebasePlugin(on, config);

  return extendedConfig;
};
