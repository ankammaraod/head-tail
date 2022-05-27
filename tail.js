const { tailMain } = require('./src/tailSrc/tailLib.js');
const { log, error } = console;
const fs = require('fs');

const main = () => {
  process.exitCode = 0;
  try {
    tailMain(
      fs.readFileSync,
      log,
      error,
      ...process.argv.slice(2)
    );
  } catch (error) {
    process.exitCode = 1;
    console.error(error.message);

  }
};

main();
