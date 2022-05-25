/* eslint-disable complexity */
const { validate, usage } =
  require('./validateArgs.js');

const isFlag = (element) => {
  return /-[nc]/.test(element);
};

const formatArgs = (arg) => {
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
  const formattedArgs = args.flatMap(formatArgs);
  return formattedArgs.filter(arg => arg.length > 0);
};

const parseValue = (value) => {
  if (/\+[0-9]/.test(value)) {
    if (value === '+0') {
      return value;
    }
    return +value - 1;
  }
  if (/-[0-9]/.test(value)) {
    return +value;
  }
  return -+value;
};
const isNumOpt = (element) => /^[+-]/.test(element);

const parseArgs = (args) => {
  const formattedArgs = splitFlagAndValue(args);
  const options = [];
  let files = [];
  let index = 0;
  let flag; let value;
  while (isFlag(formattedArgs[index]) || isNumOpt(formattedArgs[index])) {
    if (!isFlag(formattedArgs[index]) && isNumOpt(formattedArgs[index])) {
      flag = '-n';
      const number = formattedArgs[index];
      value = ['-0', '+0'].includes(number) ? number : +number - 1;
      index = index + 1;
    } else {
      flag = formattedArgs[index];
      value = parseValue(formattedArgs[index + 1]);
      index = index + 2;
    }
    options.push({ flag, value });
  }
  if (options.length === 0) {
    options.push({ flag: '-n', value: -10 });
  }
  files = formattedArgs.slice(index);

  validate({ options, files });
  return { option: options[options.length - 1], files };
};

exports.parseArgs = parseArgs;
exports.isFlag = isFlag;
exports.splitFlagAndValue = splitFlagAndValue;
exports.formatArgs = formatArgs;

