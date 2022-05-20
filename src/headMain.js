const headMain = (contents, noOfLines) => {
  return contents.filter(
    (line, index) => index < noOfLines
  );
};
exports.headMain = headMain;
