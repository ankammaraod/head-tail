const lines = (content, value) => {
  return content.split('\n').slice(-value).join('\n');
};

const char = (content, value) => {
  return content.split('').slice(-value).join('');
};

const tail = (funRef, content, value) => {
  return funRef(content, value);
};

const tailMain = ({ flag, value }, content) => {
  const funRef = flag === '-c' ? char : lines;
  tail(funRef, content, value);
};

exports.tail = tail;
exports.tailMain = tailMain;
exports.char = char;
exports.lines = lines;
