const { parseArgs } = require('./parseArgs.js');
const { print } = require('./print.js');

const joinLines = (contents) => contents.join('\n');
const splitLines = (contents) => contents.split('\n');

const bytes = (contents, noOfChars) => {
  return contents.substring(0, noOfChars);
};

const lines = (contents, noOfLines) => {
  const lines = splitLines(contents);
  return joinLines(lines.slice(0, noOfLines));
};

const strategy = (flag) => flag === '-c' ? bytes : lines;

const headOfFile = (file, sliceStrategy, value, readFile) => {
  let content;
  try {
    content = readFile(file, 'utf8');
  } catch (error) {
    return {
      file,
      hasRead: false,
      message: `head: ${file}: No such file or directory`
    };
  }
  const result = sliceStrategy(content, value);
  return { file, content: result, hasRead: true };
};

const headMain = (readFile, log, error, ...args) => {
  const { option, files } = parseArgs(args);
  const sliceStrategy = strategy(option.flag);
  const headContent = files.map(
    (file) => headOfFile(file, sliceStrategy, option.value, readFile));
  print(log, error, headContent);
};

exports.lines = lines;
exports.bytes = bytes;
exports.headOfFile = headOfFile;
exports.strategy = strategy;
exports.headMain = headMain;
