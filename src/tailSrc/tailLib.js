const { print } = require('../headSrc/print.js');
const { parseArgs } = require('./parseArgs.js');

const lines = (content, value) => {
  if (value !== 0) {
    return content.split('\n').slice(value).join('\n');
  }
};

const char = (content, value) => {
  if (value !== 0) {
    return content.split('').slice(value).join('');
  }
};

const tailMain = (readFile, log, error, ...args) => {
  const { option, files } = parseArgs(args);
  const funRef = option.flag === '-c' ? char : lines;
  const tailContent = files.map((file) => {
    let content;
    try {
      content = readFile(file, 'utf8');
    } catch (error) {
      return {
        file: file,
        hasRead: false,
        message: `tail: ${file}: No such file or directory`
      };
    }
    return {
      file, content: funRef(content, option.value), hasRead: true
    };
  }
  );
  print(log, error, tailContent);
};

exports.tailMain = tailMain;
exports.char = char;
exports.lines = lines;
