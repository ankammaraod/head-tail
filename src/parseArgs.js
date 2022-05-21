const areOptionsValid = (args) => {
  if (args.includes('-c') && args.includes('-n')) {
    return false;
  }
  if (/-[^nc]/.test(args)) {
    return false;
  }
  return true;
};

const isFlag = (flag) => {
  const regEx = /-[n,c]/;
  return regEx.test(flag);
};

const parseFlagAndValue = (options, element) => {
  options.flag = element;
  const regEx = /^-.[0-9]/;
  if (regEx.test(element)) {
    options.value = +element.slice(2);
    options.flag = element.slice(0, 2);
  }
};

const parseValueAndFile = (options, element) => {
  isFinite(+element) ? options.value = +element :
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
  const regEx = /-[n,c]/;
  if (!regEx.test(args[0])) {
    return { flag: '-n', value: 10, files: args };
  }

  const options = { flag: '', value: '', files: [] };
  for (let index = 0; index < args.length; index++) {
    isFlag(args[index]) ? parseFlagAndValue(options, args[index]) :
      parseValueAndFile(options, args[index]);
  }
  return options;
};
exports.parseArgs = parseArgs;
