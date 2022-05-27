const { headMain } = require('./src/headSrc/headLib');
const fs = require('fs');

const main = () => {
  try {
    headMain(
      fs.readFileSync,
      console.log,
      console.error,
      ...process.argv.slice(2)
    );
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
};

main();
