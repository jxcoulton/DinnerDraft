import * as admin from "firebase-admin";
import { defineConfig } from "cypress";
import { plugin as cypressFirebasePlugin } from "cypress-firebase";

const cypressConfig = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/plugins/index.ts",
    setupNodeEvents(on, config) {
      cypressFirebasePlugin(on, config, admin);
      // e2e testing node events setup code
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});

export default cypressConfig;
