/* eslint-disable complexity */
const usage = () => 'tail:  [-r] [-q] [-c # | -n #] [file ...]';
const error = (name, message) => {
  return { name, message };
};
const fileError = () => {
  return error('fileError', usage());
};

const valueError = (value) => {
  return error('valueError', `tail: illegal offset -- ${value}`);
};
const illegalOption = (option) => {
  return {
    name: 'illegalOption',
    message: `tail: illegal option -- ${option}` +
      `\n${usage()}`
  };
};

const illegalCombination = () => {
  return error('illegalCombination',
    usage());
};

const validateOptions = (options) => {
  if (!['-n', '-c'].includes(options[0].flag)) {
    throw illegalOption(options[0].flag.slice(1));
  }

  const flag = options[0].flag;
  for (let index = 1; index < options.length; index++) {
    if (flag === options[index].flag || flag !== options[index].flag) {
      throw illegalCombination();
    }
  }
};

const validateFileNotExist = (files) => {
  if (files.length === 0) {
    throw fileError();
  }
};

const validateInValidValue = (option) => {
  if (!isFinite(+option.value)) {
    throw valueError(option.value);
  }
  if (option.value === '-0') {
    process.exit(0);
  }
};

const validate = ({ options, files }) => {
  validateOptions(options);
  validateInValidValue(options[options.length - 1]);
  validateFileNotExist(files);
};

exports.validateOptions = validateOptions;
exports.validateFileNotExist = validateFileNotExist;
exports.validateInValidValue = validateInValidValue;
exports.validate = validate;
exports.usage = usage;
