const { validate, noParameters } =
  require('./validateArgs.js');

const isFlag = (element) => {
  return /^-[nc]/.test(element);
};

const formatArgs = (arg) => {
  if (isFlag(arg) && isFinite(arg)) {
    return ['-n', '' + Math.abs(arg)];
  }
  return isFlag(arg) ? [arg.slice(0, 2), arg.slice(2)] : arg;
};

const standardize = (args) => {
  if (args.length === 0) {
    throw noParameters();
  }
  const formattedArgs = args.flatMap(formatArgs);
  return formattedArgs.filter(arg => arg.length > 0);
};

const parseValue = (count) => {
  const numberStartsWithPlus = /\+[0-9]/;
  if (numberStartsWithPlus.test(count)) {
    if (count === '+0') {
      return count;
    }
    return +count - 1;
  }
  const numberStartsWithMinus = /-[0-9]/;
  if (numberStartsWithMinus.test(count)) {
    return +count;
  }
  return -+count;
};

const isNumOpt = (element) => {
  const numberAsOption = /^[+-]\d/;
  return numberAsOption.test(element);
};

const isFlagOrIsNumOpt = (element) => isFlag(element) || isNumOpt(element);

const isNotFlagAndIsNumOpt = (element) => !isFlag(element) && isNumOpt(element);

const optionsAndFiles = (args) => {
  let index = 0;
  const options = [];
  let flag;
  let count;
  while (isFlagOrIsNumOpt(args[index])) {
    if (isNotFlagAndIsNumOpt(args[index])) {

      flag = '-n';
      count = parseValue(args[index]);
      index = index + 1;
    } else {
      flag = args[index];
      count = parseValue(args[index + 1]);
      index = index + 2;
    }
    options.push({ flag, count });
  }
  const files = args.slice(index);
  return { options, files };
};

const parseArgs = (cmdArgs) => {
  const args = standardize(cmdArgs);
  const { options, files } = optionsAndFiles(args);

  if (options.length === 0) {
    options.push({ flag: '-n', count: -10 });
  }

  validate({ options, files });
  const lastOption = options[options.length - 1];
  return { option: lastOption, files };
};

exports.parseArgs = parseArgs;
exports.optionsAndFiles = optionsAndFiles;
exports.isFlag = isFlag;
exports.isNumOpt = isNumOpt;
exports.splitFlagAndValue = standardize;
exports.formatArgs = formatArgs;
exports.isFlagOrIsNumOpt = isFlagOrIsNumOpt;
exports.parseValue = parseValue;
exports.isNotFlagAndIsNumOpt = isNotFlagAndIsNumOpt;
