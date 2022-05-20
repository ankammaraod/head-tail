const lines = (contents, noOfLines) => {
  return contents.filter(
    (line, index) => index < noOfLines
  );
};

exports.lines = lines;
