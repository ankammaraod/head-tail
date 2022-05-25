const { print } = require('../headSrc/print.js');
const { parseArgs } = require('./parseArgs.js');

const lines = (content, value, isReverse) => {
  let record;
  if (value !== -0) {
    record = content.split('\n').slice(value);
  }
  if (isReverse) {
    return record.reverse().join('\n');
  }
  return record.join('\n');
};

const char = (content, value, isReverse) => {
  let record;
  if (value !== 0) {
    record = content.split('').slice(value).join('');
  }
  if (isReverse) {
    return record.split('\n').reverse().join('\n');
  }
  return record;
};

const separateFlags = (args) => {
  const selfFlags = [];
  const restOfArgs = [];
  args.forEach((arg) => {
    if (['-r', '-q'].includes(arg)) {
      selfFlags.push(arg);
    } else {
      restOfArgs.push(arg);
    }
  });
  return [selfFlags, restOfArgs];
};

const tailMain = (readFile, log, error, ...args) => {
  const [selfFlags, restOfArgs] = separateFlags(args);
  const { option, files } = parseArgs(restOfArgs);
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
      file, content: funRef(content, option.value, selfFlags.includes('-r')),
      hasRead: true
    };
  }
  );
  print(log, error, tailContent, !selfFlags.includes('-q'));
};

exports.tailMain = tailMain;
exports.char = char;
exports.lines = lines;
exports.separateFlags = separateFlags;
