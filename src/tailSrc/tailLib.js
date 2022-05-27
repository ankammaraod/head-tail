const { print } = require('../headSrc/print.js');
const { parseArgs } = require('./parseArgs.js');

const lines = (content, value, isReverse) => {
  let record;
  const zeroWithMinus = -0;
  if (value !== zeroWithMinus) {
    record = content.split('\n').slice(value);
  }
  if (isReverse) {
    return record.reverse().join('\n');
  }
  return record.join('\n');
};

const bytes = (content, value, isReverse) => {
  let record;
  if (value !== 0) {
    record = content.split('').slice(value).join('');
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

const tailOfFile = (file, sliceStrategy, value, readFile, isReverse) => {
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
  const result = sliceStrategy(content, value, isReverse);
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
    tailOfFile(file, sliceStrategy, option.value, readFile, isReverse)
  );

  const isHeaderNeeded = !selfFlags.includes('-q');

  print(log, error, tailOfFiles, isHeaderNeeded);
};

exports.tailMain = tailMain;
exports.bytes = bytes;
exports.lines = lines;
exports.separateFlags = separateFlags;
