const areOptionsValid = (options) => {
  const startsWith = /^-[nc]/;
  if (!startsWith.test(options[0].flag)) {
    throw {
      name: 'wrongOptions',
      message: `head: illegal option -- ${options[0].flag.slice(1)}` +
        '\nusage: head [-n lines | -c bytes] [file ...]'
    };
  }
  const flag = options[0].flag;
  for (let index = 1; index < options.length; index++) {
    if (flag !== options[index].flag) {
      throw {
        name: 'wrongOptions',
        message: 'head: can\'t combine line and byte counts'
      };
    }
  }
  return true;
};

const validate = (options) => {
  if (options.length === 0) {
    throw {
      name: 'wrongOptions',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
  return areOptionsValid(options);
};

const throwIfFileNotExists = (files) => {
  if (files.length === 0) {
    throw {
      name: 'fileError',
      message: 'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
};

const throwIfValueNotValid = (option) => {
  const flagType = option.flag === '-n' ? 'line' : 'byte';
  if (option.value === 0 || !isFinite(+option.value)) {
    throw {
      name: 'valueError',
      message: `head: illegal ${flagType} count -- ${option.value}`
    };
  }
};

const throwIfIllegalFlag = (flag) => {
  if (!(flag.startsWith('-c') || flag.startsWith('-n'))) {
    throw {
      name: 'wrongOptions',
      message: `head: illegal option -- ${flag.slice(1)}\n` +
        'usage: head [-n lines | -c bytes] [file ...]'
    };
  }
  return true;
};

const isFlag = (element) => {
  return element.startsWith('-');
};

const throwIfDataInValid = ({ options, files }) => {
  throwIfFileNotExists(files);
  validate(options);
  throwIfValueNotValid(options[options.length - 1]);
  throwIfIllegalFlag(options[options.length - 1].flag);
};

const formatArgs = function (arg) {
  if (arg.startsWith('-') && isFinite(arg)) {
    return ['-n', '' + Math.abs(arg)];
  }
  return arg.startsWith('-') ? [arg.slice(0, 2), arg.slice(2)] : arg;
};

const fixArgsFormat = function (args) {
  const formattedArgs = args.flatMap(formatArgs);
  return formattedArgs.filter(arg => arg.length > 0);
};

const parseArgs = (args) => {
  if (!isFlag(args[0])) {
    return { option: { flag: '-n', value: 10 }, files: args };
  }
  const formattedArgs = fixArgsFormat(args);
  const options = [];
  let files = [];
  for (let index = 0; index < formattedArgs.length; index++) {
    if (isFlag(formattedArgs[index])) {
      const flag = formattedArgs[index];
      const value = +formattedArgs[++index];
      options.push({ flag, value });
    } else {
      files = formattedArgs.slice(index);
      index = formattedArgs.length;
    }
  }

  throwIfDataInValid({ options, files });
  return { option: options[options.length - 1], files };
};

exports.parseArgs = parseArgs;
exports.areOptionsValid = areOptionsValid;
exports.isFlag = isFlag;
exports.throwIfFileNotExists = throwIfFileNotExists;
exports.throwIfValueNotValid = throwIfValueNotValid;
exports.validate = validate;
