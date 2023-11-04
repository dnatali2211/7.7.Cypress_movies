const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "amte81",
  e2e: {
    baseUrl: "http://qamid.tmweb.ru/admin/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
