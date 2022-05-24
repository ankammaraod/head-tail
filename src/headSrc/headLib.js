const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');
const { print } = require('./print.js');

const extract = (contents, separators, count) => {
  const lines = splitLines(contents, separators);
  return joinLines(lines.slice(0, count), separators);
};

const getSeparator = (flag) => flag === '-n' ? '\n' : '';

const head = ({ flag, value }, content) => {
  const separators = getSeparator(flag);
  return extract(content, separators, value);
};

const headMain = (readFile, log, error, ...args) => {
  const { option, files } = parseArgs(args);
  const headContent = files.map((file) => {
    let content;
    try {
      content = readFile(file, 'utf8');
    } catch (error) {
      return {
        file: file,
        hasRead: false,
        message: `head: ${file}: No such file or directory`
      };
    }
    return { file, content: head(option, content), hasRead: true };
  }
  );
  print(log, error, headContent);
};
exports.head = head;
exports.extract = extract;
exports.getSeparator = getSeparator;
exports.headMain = headMain;
