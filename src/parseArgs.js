/* eslint-disable max-len */
const areOptionsValid = (args) => {
  const isLinesFlagExists = /-n[1-9]*/.test(args) || /-\d+/.test(args);
  if (/-c[1-9]*/.test(args) && isLinesFlagExists) {
    throw {
      name: 'wrongOptions',
      message: 'head: can\'t combine line and byte counts'
    };
  }
  return true;
};
const validate = (args) => {
  if (args.length === 0) {
    throw {
      name: 'wrongOptions',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
  return areOptionsValid(args);
};

const blowIfFileNotExists = (files) => {
  if (files.length === 0) {
    throw {
      name: 'fileError',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
};

const blowIfValueNotValid = (option) => {
  const flagType = option.flag === '-n' ? 'line' : 'byte';
  if (option.value === '' || option.value === 0) {
    throw {
      name: 'valueError',
      message: `head: illegal ${flagType} count -- 0`
    };
  }
};
const blowIfIllegalFlag = (flag) => {
  if (/-[^nc]/.test(flag)) {
    throw {
      name: 'wrongOptions',
      message: `head: illegal option -- ${flag.slice(1)}\n` +
        'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
  return true;
};

const isFlag = (element) => {
  const regEx = /-./;
  return regEx.test(element);
};

const parseFlagAndValue = (options, element) => {
  options.option.flag = element;
  let regEx = /^-.[1-9]/;
  if (regEx.test(element)) {
    options.option.value = +element.slice(2);
    options.option.flag = element.slice(0, 2);
  }
  regEx = /^-[1-9]/;
  if (regEx.test(element)) {
    options.option.flag = '-n';
    options.option.value = +element.slice(1);
  }
  return options;
};

const parseValueAndFile = (options, element) => {
  isFinite(+element) ? options.option.value = +element :
    options.files.push(element);
  return options;
};

const parseArgs = (args) => {
  validate(args);
  const regEx = /-./;
  if (!regEx.test(args[0])) {
    return { option: { flag: '-n', value: 10 }, files: args };
  }

  const options = { option: { flag: '-n', value: '' }, files: [] };
  for (let index = 0; index < args.length; index++) {
    isFlag(args[index]) ? parseFlagAndValue(options, args[index]) :
      parseValueAndFile(options, args[index]);
  }
  blowIfFileNotExists(options.files);
  blowIfValueNotValid(options.option);
  blowIfIllegalFlag(options.option.flag);
  return options;
};

exports.parseArgs = parseArgs;
exports.areOptionsValid = areOptionsValid;
exports.isFlag = isFlag;
exports.blowIfFileNotExists = blowIfFileNotExists;
exports.blowIfValueNotValid = blowIfValueNotValid;
exports.validate = validate;
exports.parseFlagAndValue = parseFlagAndValue;
exports.parseValueAndFile = parseValueAndFile;
