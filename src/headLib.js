// const fs = require('fs');
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

const headMain = function (readFile, [option, value, ...fileName]) {

  let content;
  try {
    content = readFile(fileName[0], 'utf8');
  } catch (error) {
    return error.name;
  }
  return head(option, value, content);
};

exports.lines = lines;
exports.characters = characters;
exports.head = head;
exports.headMain = headMain;
