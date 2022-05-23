const { splitLines, joinLines } = require('./stringUtils.js');
const { parseArgs } = require('./parseArgs.js');

const extract = (contents, separators, count) => {
  const lines = splitLines(contents, separators);
  return joinLines(lines.slice(0, count), separators);
};

const getSeparator = (flag) => flag === '-n' ? '\n' : '';

const head = ({ flag, value }, content) => {
  const separators = getSeparator(flag);
  return extract(content, separators, value);
};

const formatHead = (headContents, files) => {
  if (files.length === 1) {
    return headContents;
  }
  return headContents.map((content, index) => {
    return content === '' ? '' : `==>${files[index]}<==\n${content}\n`;
  });
};

const headMain = function (readFile, ...args) {
  const { option, files } = parseArgs(args);
  let content;
  const headContent = files.map((file) => {

    try {
      content = readFile(file, 'utf8');

    } catch (error) {
      console.error(`head: ${file}: No such file or directory`);
      return '';
    }
    return head(option, content);

  }
  );
  return formatHead(headContent, files).join('\n');
};
exports.head = head;
exports.extract = extract;
exports.getSeparator = getSeparator;
exports.headMain = headMain;
exports.formatHead = formatHead;
