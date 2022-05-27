const { headMain } = require('./src/headSrc/headLib');
const fs = require('fs');

const main = () => {
  process.exitCode = 0;
  try {
    process.exitCode = headMain(
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
