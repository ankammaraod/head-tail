const parseArgs = (args) => {
  const options = {};

  options.option = args.some((element) => element === '-c') ? '-c' :
    '-n';

  options.value = args.find((element) => isFinite(+element));
  options.value = options.value ? +options.value : 10;

  const regEx = /^.*\..*/;
  options.files = args.filter((element) => regEx.test(element));
  return options;
};
// console.log(parseArgs(['a.txt']));
exports.parseArgs = parseArgs;
