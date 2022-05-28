const usage = () => 'usage: head [-n lines | -c bytes] [file ...]';

const error = (name, message) => {
  return { name, message };
};

const illegalOption = (option) => {
  return error('illegalOption',
    `head: illegal option -- ${option}` +
    `\n${usage()}`);
};

const illegalCombination = () => {
  return error('illegalCombination',
    'head: can\'t combine line and byte counts');
};

const valueError = (flag, count) => {
  return error('valueError', `head: illegal ${flag} count -- ${count}`);
};

const fileError = () => {
  return error('fileError', usage());
};

const validateOptions = (options) => {
  if (!['-n', '-c'].includes(options[0].flag)) {
    throw illegalOption(options[0].flag.slice(1));
  }

  const flag = options[0].flag;
  for (let index = 1; index < options.length; index++) {
    if (flag !== options[index].flag) {
      throw illegalCombination();
    }
  }
};

const noParameters = () => {
  return error('noParameters', usage());
};

const validateFileNotExist = (files) => {
  if (files.length === 0) {
    throw fileError();
  }
};

const validateInValidValue = (option) => {
  const flagType = option.flag === '-n' ? 'line' : 'byte';
  if (option.count === 0 || !isFinite(+option.count)) {
    throw valueError(flagType, option.count);
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
exports.error = error;
exports.noParameters = noParameters;
