/* eslint-disable no-magic-numbers */
/* eslint-disable no-useless-catch */

const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const extract = (contents, separators, count) => {
  const splittedLines = splitLines(contents, separators);
  return joinLines(splittedLines.slice(0, count), separators);
};

const getSeparator = (option) => option === '-n' ? '\n' : '';

const head = (option, value, content) => {
  const separators = getSeparator(option);
  return extract(content, separators, value);
};

const headMain = function (readFile, ...args) {
  const { option, value, files } = parseArgs(args);
  let content;
  try {
    content = readFile(files[0], 'utf8');
  } catch (error) {
    throw {
      name: 'FileReadError',
      message: `Unable to read ${files[0]}`
    };
  }
  return head(option, value, content);
};

exports.head = head;
exports.extract = extract;
exports.getSeparator = getSeparator;
exports.headMain = headMain;
