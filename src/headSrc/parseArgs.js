const { validate } =
  require('./validateArgs.js');

const isFlag = (element) => {
  return element.startsWith('-');
};

const splitArgs = (arg) => {
  if (isFlag(arg) && isFinite(arg)) {
    return ['-n', '' + Math.abs(arg)];
  }
  return isFlag(arg) ? [arg.slice(0, 2), arg.slice(2)] : arg;
};

const standardize = (rawArgs) => {
  const args = rawArgs.flatMap(splitArgs);
  return args.filter(arg => arg.length > 0);
};

const optionsAndFiles = (args) => {
  let index = 0;
  const options = [];
  while (isFlag(args[index])) {
    const flag = args[index];
    const value = +args[index + 1];
    index = index + 2;
    options.push({ flag, value });
  }
  const files = args.slice(index);
  return [options, files];
};

const parseArgs = (cmdArgs) => {
  const defaultOption = { flag: '-n', value: 10 };
  const args = standardize(cmdArgs);
  const [options, files] = optionsAndFiles(args);

  if (options.length === 0) {
    options.push(defaultOption);
  }

  validate({ options, files });
  const lastOption = options[options.length - 1];
  return { option: lastOption, files };
};

exports.parseArgs = parseArgs;
exports.isFlag = isFlag;
exports.standardized = standardize;
exports.splitArgs = splitArgs;
