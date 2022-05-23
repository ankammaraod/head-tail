const usage = () => 'usage: head [-n lines | -c bytes] [file ...]';

const areOptionsValid = (options) => {
  const startsWith = /^-[nc]/;
  if (!startsWith.test(options[0].flag)) {
    throw {
      name: 'wrongOptions',
      message: `head: illegal option -- ${options[0].flag.slice(1)}` +
        `\n${usage()}`
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
};

const throwIfFileNotExists = (files) => {
  if (files.length === 0) {
    throw {
      name: 'fileError',
      message: usage()
    };
  }
  return true;
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
        usage()
    };
  }
  return true;
};

const validate = ({ options, files }) => {
  areOptionsValid(options);
  throwIfValueNotValid(options[options.length - 1]);
  throwIfFileNotExists(files);
  throwIfIllegalFlag(options[options.length - 1].flag);
};

exports.areOptionsValid = areOptionsValid;
exports.throwIfFileNotExists = throwIfFileNotExists;
exports.throwIfValueNotValid = throwIfValueNotValid;
exports.throwIfIllegalFlag = throwIfIllegalFlag;
exports.validate = validate;
exports.usage = usage;
