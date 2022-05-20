const characters = (contents, noOfChars) => {
  return contents.join('\n').substring(0, noOfChars).split('\n');
};

const lines = (contents, noOfLines) => {
  return contents.slice(0, noOfLines);
};

exports.lines = lines;
exports.characters = characters;
