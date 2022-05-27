const header = (record) => {
  return `==>${record.file}<==\n${record.content}`;
};

const print = (log, error, headContents, isHeaderNeeded = true) => {
  if (headContents.length === 1 && headContents[0].hasRead) {
    log(headContents[0].content);
    return;
  }

  headContents.forEach((record) => {
    if (record.hasRead) {
      isHeaderNeeded ? log(header(record)) : log(record.content);
    } else {
      error(record.message + '\n');
    }
  });
};

exports.print = print;
