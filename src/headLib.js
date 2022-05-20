/* eslint-disable no-magic-numbers */
/* eslint-disable no-useless-catch */

const { parseArgs } = require('./parseArgs.js');

const joinLines = (contents, separator) => contents.join(separator);
const splitLines = (contents, separator) => contents.split(separator);

const extract = (contents, seperator, count) => {
  const splittedLines = splitLines(contents, seperator);
  return joinLines(splittedLines.slice(0, count), seperator);
};

const getSeparator = (option) => option === '-n' ? '\n' : '';
const head = (option, value, content) => {
  const seperator = getSeparator(option);
  return extract(content, seperator, value);
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
exports.headMain = headMain;
