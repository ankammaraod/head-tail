const characters = (contents) => {
  return [contents[0][0]];
};

const lines = (contents, noOfLines) => {
  return contents.filter(
    (line, index) => index < noOfLines
  );
};

exports.lines = lines;
exports.characters = characters;
