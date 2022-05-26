const { validate, usage } =
  require('./validateArgs.js');

const isFlag = (element) => {
  return /-./.test(element);
};

const splitArgs = (arg) => {
  if (isFlag(arg) && isFinite(arg)) {
    return ['-n', '' + Math.abs(arg)];
  }
  return isFlag(arg) ? [arg.slice(0, 2), arg.slice(2)] : arg;
};

const splitFlagAndValue = (args) => {
  if (args.length === 0) {
    throw {
      name: 'noParameters',
      message: usage()
    };
  }
  const formattedArgs = args.flatMap(splitArgs);
  return formattedArgs.filter(arg => arg.length > 0);
};

const parseArgs = (args) => {
  const splittedArgs = splitFlagAndValue(args);
  const options = [];
  let files = [];
  let index = 0;
  while (isFlag(splittedArgs[index])) {
    const flag = splittedArgs[index];
    const value = +splittedArgs[index + 1];
    index = index + 2;
    options.push({ flag, value });
  }
  if (options.length === 0) {
    options.push({ flag: '-n', value: 10 });
  }
  files = splittedArgs.slice(index);
  validate({ options, files });
  return { option: options[options.length - 1], files };
};

exports.parseArgs = parseArgs;
exports.isFlag = isFlag;
exports.splitFlagAndValue = splitFlagAndValue;
exports.splitArgs = splitArgs;
