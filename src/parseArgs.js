/* eslint-disable complexity */
/* eslint-disable no-magic-numbers */
const validate = (args) => {
  let countOfOption = 0;
  let countOfValues = 0;

  for (let index = 0; index < args.length; index++) {
    countOfOption += /^-.$/.test(args[index]) ? 1 : 0;
    countOfValues += /[0-9]/.test(args[index]);
  }
  if (countOfOption > 1 || countOfValues > 1) {
    throw {};
  }
};

const parseArgs = (args) => {
  validate(args);
  const options = {};

  options.option = args.some((element) => element === '-c') ? '-c' : '-n';

  options.value = args.find((element) => isFinite(+element));
  options.value = options.value ? +options.value : 10;

  const regEx = /^.*\..*/;
  options.files = args.filter((element) => regEx.test(element));
  return options;
};
// console.log(parseArgs(['a.txt']));
exports.parseArgs = parseArgs;
