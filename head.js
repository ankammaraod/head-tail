const { headMain } = require('./src/headLib.js');
const { log, error } = console;
const fs = require('fs');

const main = () => {
  try {
    headMain(fs.readFileSync, log, error, ...process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
  }
};

main();
