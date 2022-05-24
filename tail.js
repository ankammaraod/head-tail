const { tailMain } = require('./src/tailSrc/tailLib.js');
const { log, error } = console;
const fs = require('fs');

const main = () => {
  try {
    tailMain(fs.readFileSync, log, error,
      ...process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
  }
};

main();
