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

exports.lines = lines;
exports.characters = characters;
