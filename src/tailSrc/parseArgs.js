const { validate, usage } =
  require('./validateArgs.js');

const isFlag = (element) => {
  return /-[^\d]/.test(element);
};

const formatArgs = function (arg) {

  if (isFlag(arg) && isFinite(arg)) {
    return ['-n', '' + Math.abs(arg)];
  }
  return isFlag(arg) ? [arg.slice(0, 2), arg.slice(2)] : arg;
};

const splitFlagAndValue = function (args) {
  if (args.length === 0) {
    throw {
      name: 'noParameters',
      message: usage()
    };
  }
  const formattedArgs = args.flatMap(formatArgs);
  return formattedArgs.filter(arg => arg.length > 0);
};

const parseArgs = (args) => {
  const formattedArgs = splitFlagAndValue(args);
  const options = [];
  let files = [];
  let index = 0;
  while (isFlag(formattedArgs[index])) {
    const flag = formattedArgs[index];
    const value = +formattedArgs[index + 1] * -1;
    index = index + 2;
    options.push({ flag, value });
  }
  if (options.length === 0) {
    options.push({ flag: '-n', value: -10 });
  }
  files = formattedArgs.slice(index);

  validate({ options, files });
  options[options.length - 1].value = +options[options.length - 1].value;
  return { option: options[options.length - 1], files };
};
exports.parseArgs = parseArgs;
exports.isFlag = isFlag;
exports.splitFlagAndValue = splitFlagAndValue;
exports.formatArgs = formatArgs;
