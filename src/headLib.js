const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const extract = (contents, separators, count) => {
  const lines = splitLines(contents, separators);
  return joinLines(lines.slice(0, count), separators);
};

const getSeparator = (flag) => flag === '-n' ? '\n' : '';

const head = (flag, value, content) => {
  const separators = getSeparator(flag);
  return extract(content, separators, value);
};

const headMain = function (readFile, ...args) {
  const { flag, value, files } = parseArgs(args);
  let content;
  try {
    content = readFile(files[0], 'utf8');
  } catch (error) {
    throw {
      name: 'FileReadError',
      message: `Unable to read ${files[0]}`
    };
  }
  return head(flag, value, content);
};

exports.head = head;
exports.extract = extract;
exports.getSeparator = getSeparator;
exports.headMain = headMain;
