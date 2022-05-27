const header = (record) => {
  return `==>${record.file}<==\n${record.content}`;
};

const format = (headContents) => {
  if (headContents.length < 2) {
    return headContents;
  }

  return headContents.map((headContent) => {
    return headContent.hasRead ? header(headContent) : headContent;
  }
  );
};

const print = (log, error, headContents, isHeaderNeeded = true) => {
  const formattedHeadContents = format(headContents);

  formattedHeadContents.forEach((record) => {
    if (record.hasRead) {
      isHeaderNeeded ? log(record) : log(record.content);
    } else {
      error(record.message + '\n');
    }
  });
};

exports.print = print;
