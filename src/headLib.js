/* eslint-disable no-magic-numbers */
/* eslint-disable no-useless-catch */

const { parseArgs } = require('./parseArgs.js');

const joinLines = (contents) => contents.join('\n');
const splitLines = (contents) => contents.split('\n');

const characters = (contents, noOfChars) => {
  return contents.substring(0, noOfChars);
};

const lines = (contents, noOfLines) => {
  const splittedLines = splitLines(contents);
  return joinLines(splittedLines.slice(0, noOfLines));
};

const head = (option, value, content) => {
  const keys = { '-n': lines, '-c': characters };
  const funRef = keys[option];
  return funRef(content, value);
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

exports.lines = lines;
exports.characters = characters;
exports.head = head;
exports.headMain = headMain;
