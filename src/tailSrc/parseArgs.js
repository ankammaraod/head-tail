/* eslint-disable complexity */
const { validate, noParameters } =
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
    throw noParameters();
  }
  const formattedArgs = args.flatMap(formatArgs);
  return formattedArgs.filter(arg => arg.length > 0);
};

const parseValue = (value) => {
  const numberStartsWithPlus = /\+[0-9]/;
  if (numberStartsWithPlus.test(value)) {
    if (value === '+0') {
      return value;
    }
    return +value - 1;
  }
  const numberStartsWithMinus = /-[0-9]/;
  if (numberStartsWithMinus.test(value)) {
    return +value;
  }
  return -+value;
};

const isNumOpt = (element) => {
  const numberAsOption = /^[+-]/;
  numberAsOption.test(element);
};
const isFlagOrIsNumOpt = (element) => isFlag(element) ||
  isNumOpt(element);

const isNotFlagAndIsNumOpt = (element) => !isFlag(element) &&
  isNumOpt(element);

const parseArgs = (rawArgs) => {
  const splittedArgs = splitFlagAndValue(rawArgs);
  const options = [];
  let files = [];
  let index = 0;
  let flag; let value;

  while (isFlagOrIsNumOpt(splittedArgs[index])) {
    if (isNotFlagAndIsNumOpt(splittedArgs[index])) {
      flag = '-n';
      const number = splittedArgs[index];
      value = ['-0', '+0'].includes(number) ? number : +number - 1;
      index = index + 1;
    } else {
      flag = splittedArgs[index];
      value = parseValue(splittedArgs[index + 1]);
      index = index + 2;
    }
    options.push({ flag, value });
  }
  files = splittedArgs.slice(index);

  if (options.length === 0) {
    options.push({ flag: '-n', value: -10 });
  }

  validate({ options, files });
  const lastOption = options[options.length - 1];
  return { option: lastOption, files };
};

exports.parseArgs = parseArgs;
exports.isFlag = isFlag;
exports.splitFlagAndValue = splitFlagAndValue;
exports.formatArgs = formatArgs;

