/* eslint-disable max-statements */
/* eslint-disable complexity */

const areBothOptionsExists = (args) =>
  args.includes('-c') && args.includes('-n');

const isOption = (option) => /-./.test(option);

const parseFlagAndValue = (options, element) => {
  options.option = element;
  if (/^-.[0-9]/.test(element)) {
    options.value = +element.slice(2);
    options.option = element.slice(0, 2);
  }
};

const parseValueAndFile = (options, element) => {
  isFinite(+element) ? options.value = +element :
    options.files.push(element);
};

const parseArgs = (args) => {
  if (areBothOptionsExists(args)) {
    throw {
      name: 'bothOptionsExists'
    };
  }
  if (!/-./.test(args[0])) {
    return { option: '-n', value: 10, files: args };
  }
  const options = { option: '', value: '', files: [] };
  let index = 0;

  while (index < args.length) {
    isOption(args[index]) ? parseFlagAndValue(options, args[index]) :
      parseValueAndFile(options, args[index]);
    index++;
  }
  return options;
};
exports.parseArgs = parseArgs;
