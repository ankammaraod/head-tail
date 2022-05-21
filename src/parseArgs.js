const areOptionsValid = (args) => {
  if (/-c[1-9]*/.test(args) && /-n[1-9]*/.test(args)) {
    return false;
  }
  if (/-[^nc]/.test(args)) {
    return false;
  }
  return true;
};

const isFlag = (element) => {
  const regEx = /-[n,c]/;
  return regEx.test(element);
};

const parseFlagAndValue = (options, element) => {
  options.option.flag = element;
  const regEx = /^-.[1-9]/;
  if (regEx.test(element)) {
    options.option.value = +element.slice(2);
    options.option.flag = element.slice(0, 2);
  }
};

const parseValueAndFile = (options, element) => {
  isFinite(+element) ? options.option.value = +element :
    options.files.push(element);
};

const validate = (args) => {

  if (args.length === 0) {
    throw {
      name: 'wrongOptions',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
  if (!areOptionsValid(args)) {
    throw {
      name: 'wrongOptions',
      message: 'head: can\'t combine line and byte counts'
    };
  }
};
const blowIfFileNotExists = (files) => {
  if (files.length === 0) {
    throw {
      name: 'fileError',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
};
const blowIfValueNotValid = (value) => {
  if (value === '' || value === 0) {
    throw {
      name: 'valueError',
      message: 'head: illegal line count -- 0'
    };
  }
};

const parseArgs = (args) => {
  validate(args);
  const regEx = /-[nc]/;
  if (!regEx.test(args[0])) {
    return { option: { flag: '-n', value: 10 }, files: args };
  }

  const options = { option: { flag: '', value: '' }, files: [] };
  for (let index = 0; index < args.length; index++) {
    isFlag(args[index]) ? parseFlagAndValue(options, args[index]) :
      parseValueAndFile(options, args[index]);
  }
  blowIfFileNotExists(options.files);
  blowIfValueNotValid(options.option.value);
  return options;
};
exports.parseArgs = parseArgs;
exports.areOptionsValid = areOptionsValid;
exports.isFlag = isFlag;
exports.blowIfFileNotExists = blowIfFileNotExists;
exports.blowIfValueNotValid = blowIfValueNotValid;
