const header = (record) => {
  return `==>${record.file}<==\n${record.content}`;
};

const noHeader = (headContent) => headContent.content;

const getFormatter = (headContents) =>
  headContents.length < 2 ? noHeader : header;

const print = (log, error, headContents, isHeaderNeeded = true) => {
  const formatter = getFormatter(headContents);

  headContents.forEach((record) => {
    if (record.hasRead) {
      isHeaderNeeded ? log(formatter(record)) : log(record.content);
    } else {
      error(record.message + '\n');
    }
  });
};

exports.print = print;
