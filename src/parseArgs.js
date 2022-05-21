const areOptionsValid = (args) => {
  if (args.includes('-c') && args.includes('-n')) {
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
  const regEx = /^-.[0-9]/;
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
  if (!areOptionsValid(args)) {
    throw {
      name: 'wrongOptions',
      message: 'problem with options'
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
  return options;
};
exports.parseArgs = parseArgs;
exports.areOptionsValid = areOptionsValid;
exports.isFlag = isFlag;
