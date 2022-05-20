const joinLines = (contents) => contents.join('\n');
const splitLines = (contents) => contents.split('\n');

const characters = (contents, noOfChars) => {
  return contents.substring(0, noOfChars);
};

const lines = (contents, noOfLines) => {
  const splittedLines = splitLines(contents);
  return joinLines(splittedLines.slice(0, noOfLines));
};

const headMain = function (readFile, [option, value, fileName]) {
  const keys = { '-n': lines, '-c': characters };
  const funRef = keys[option];
  const contents = 'hai\nhello';
  return funRef(contents, value);
};

exports.lines = lines;
exports.characters = characters;
exports.headMain = headMain;
