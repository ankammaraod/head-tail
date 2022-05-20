const joinLines = (contents) => contents.join('\n');
const splitLines = (contents) => contents.split('\n');

const characters = (contents, noOfChars) => {
  const joinedContents = joinLines(contents);
  const requiredContents = joinedContents.substring(0, noOfChars);
  return splitLines(requiredContents);
};

const lines = (contents, noOfLines) => {
  return contents.slice(0, noOfLines);
};

const headMain = function (readFile, [option, value, fileName]) {
  const keys = { '-n': lines, '-c': characters };
  const funRef = keys[option];
  const contents = ['hai', 'hello'];
  return joinLines(funRef(contents, value));
};

exports.lines = lines;
exports.characters = characters;
exports.headMain = headMain;
