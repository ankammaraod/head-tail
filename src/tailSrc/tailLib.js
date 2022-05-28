const { print } = require('../headSrc/print.js');
const { parseArgs } = require('./parseArgs.js');

const lines = (content, count, isReverse) => {
  let record;
  const zeroWithMinus = -0;
  if (count !== zeroWithMinus) {
    record = content.split('\n').slice(count);
  }
  if (isReverse) {
    return record.reverse().join('\n');
  }
  return record.join('\n');
};

const bytes = (content, count, isReverse) => {
  let record;
  if (count !== 0) {
    record = content.split('').slice(count).join('');
  }
  if (isReverse) {
    return record.split('\n').reverse().join('\n');
  }
  return record;
};

const separateFlags = (args) => {
  const selfFlags = [];
  const restOfArgs = [];
  args.forEach((arg) => {
    if (['-r', '-q'].includes(arg)) {
      selfFlags.push(arg);
    } else {
      restOfArgs.push(arg);
    }
  });
  return { selfFlags, restOfArgs };
};

const strategy = (flag) => flag === '-c' ? bytes : lines;

const tailOfFile = (file, sliceStrategy, count, readFile, isReverse) => {
  let content;
  try {
    content = readFile(file, 'utf8');
  } catch (error) {
    process.exitCode = 1;
    return {
      file: file,
      hasRead: false,
      message: `tail: ${file}: No such file or directory`
    };
  }
  const result = sliceStrategy(content, count, isReverse);
  return {
    file,
    content: result,
    hasRead: true
  };
};

const tailMain = (readFile, log, error, ...args) => {
  const { selfFlags, restOfArgs } = separateFlags(args);
  const { option, files } = parseArgs(restOfArgs);

  const sliceStrategy = strategy(option.flag);
  const isReverse = selfFlags.includes('-r');

  const tailOfFiles = files.map((file) =>
    tailOfFile(file, sliceStrategy, option.count, readFile, isReverse)
  );

  const isHeaderNeeded = !selfFlags.includes('-q');

  print(log, error, tailOfFiles, isHeaderNeeded);
};

exports.tailMain = tailMain;
exports.bytes = bytes;
exports.lines = lines;
exports.separateFlags = separateFlags;
