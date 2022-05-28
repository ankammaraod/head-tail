const { parseArgs } = require('./parseArgs.js');
const { print } = require('./print.js');
const { noParameters } = require('./validateArgs');

const joinLines = (contents) => contents.join('\n');
const splitLines = (contents) => contents.split('\n');

const bytes = (contents, noOfChars) => {
  return contents.substring(0, noOfChars);
};

const lines = (contents, noOfLines) => {
  const lines = splitLines(contents);
  return joinLines(lines.slice(0, noOfLines));
};

const sliceBy = (flag) => {
  //  return { '-c': bytes, '-n': lines }[flag];
  const references = { '-c': bytes, '-n': lines };
  return references[flag];
};

const headOfFile = (file, sliceStrategy, count, readFile) => {
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
  const result = sliceStrategy(content, count);
  return { file, content: result, hasRead: true };
};

const getExitCode = (headContents) => {
  return headContents.every((headContent) => {
    return headContent.hasRead ? 0 : 1;
  }
  );
};

const headMain = (readFile, log, error, ...args) => {
  if (args.length === 0) {
    throw noParameters();
  }
  const { option, files } = parseArgs(args);
  const sliceStrategy = sliceBy(option.flag);
  const headContents = files.map(
    (file) => headOfFile(file, sliceStrategy, option.count, readFile));
  print(log, error, headContents);

  return getExitCode(headContents);
};

exports.lines = lines;
exports.bytes = bytes;
exports.headOfFile = headOfFile;
exports.strategy = sliceBy;
exports.headMain = headMain;
