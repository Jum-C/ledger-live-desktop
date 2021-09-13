const { setHeadlessWhen } = require("@codeceptjs/configure");
const getUserDataPath = require("./playwright/userDataPath");

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: "playwright/codecept/*.test.js",
  output: "./output",
  helpers: {
    Playwright: {
      show: true,
      browser: "electron",
      electron: {
        executablePath: require("electron"),
        args: ["./.webpack/main.bundle.js", `--user-data-dir=${getUserDataPath()}`],
      },
    },
  },
  include: {
    I: "./steps_file.js",
  },
  bootstrap: null,
  mocha: {},
  name: "ledger-live-desktop",
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true,
    },
    tryTo: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
};
